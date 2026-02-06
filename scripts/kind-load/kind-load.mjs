#!/usr/bin/env node

import fs from "fs";
import yaml from "js-yaml";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";
import { exec } from "child_process";

const executeCommandAsync = promisify(exec);
const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryPath = dirname(currentFilePath);
const dockerComposeListFilePath = join(currentDirectoryPath, "./docker-compose-paths.txt");
const logFileAbsolutePath = join(currentDirectoryPath, "./kind-load.log");

const appendLogMessage = (message) => {
  const timestamp = new Date().toISOString().replace("T", " ").split(".")[0];
  fs.appendFileSync(logFileAbsolutePath, `[${timestamp}] ${message}\n`);
};

const imageExistsLocally = async (image) => {
  try {
    await executeCommandAsync(`docker image inspect ${image}`);
    return true;
  } catch {
    return false;
  }
};

const loadImageIntoKind = async (image) => {
  const command = `kind load docker-image ${image}`;
  await executeCommandAsync(command);
};

const main = async () => {
  let dockerComposePaths = [];
  if (fs.existsSync(dockerComposeListFilePath)) {
    dockerComposePaths = fs
      .readFileSync(dockerComposeListFilePath, "utf-8")
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line && !line.startsWith("#"));
  }
  if (dockerComposePaths.length === 0) {
    appendLogMessage(`WARNING: No valid docker compose paths found in ${dockerComposeListFilePath}, using ./deploy/docker/docker-compose.yaml as default`);
    console.warn(`No valid docker compose paths found in ${dockerComposeListFilePath}, using ./deploy/docker/docker-compose.yaml as default`);
    dockerComposePaths = ["./deploy/docker/docker-compose.yaml"];
  }
  appendLogMessage("=====================================================================");
  appendLogMessage(`Kind Docker Image Load Started at ${new Date().toLocaleString()}`);
  appendLogMessage(`Docker Compose file list: ${dockerComposeListFilePath}`);
  appendLogMessage("=====================================================================");
  const loadedImages = new Set();
  let loadedImagesCount = 0;
  for (const dockerComposePath of dockerComposePaths) {
    appendLogMessage("");
    appendLogMessage("-------------------------------------------------------------");
    appendLogMessage(`Processing docker compose: ${dockerComposePath}`);
    appendLogMessage("-------------------------------------------------------------");
    if (!fs.existsSync(dockerComposePath)) {
      appendLogMessage(`WARNING: Docker compose file not found: ${dockerComposePath}`);
      continue;
    }
    const composeContent = fs.readFileSync(dockerComposePath, "utf8");
    const compose = yaml.load(composeContent);
    if (!compose.services) {
      appendLogMessage(`WARNING: No services defined in ${dockerComposePath}`);
      continue;
    }
    for (const [serviceName, service] of Object.entries(compose.services)) {
      if (!service.image) {
        appendLogMessage(`Service "${serviceName}" has no image, skipping`);
        continue;
      }
      const image = service.image;
      appendLogMessage(`Resolving image for service "${serviceName}": ${image}`);
      try {
        if (loadedImages.has(image)) {
          appendLogMessage(`Already loaded: ${image}, skipping`);
          continue;
        }
        const exists = await imageExistsLocally(image);
        if (!exists) {
          appendLogMessage(`WARNING: Image not found locally, skipping: ${image}`);
          continue;
        }
        appendLogMessage(`Loading image into kind: ${image}`);
        await loadImageIntoKind(image);
        loadedImages.add(image);
        loadedImagesCount++;
      } catch (err) {
        appendLogMessage(`FATAL: Failed to load image "${image}"`);
        appendLogMessage(`Reason: ${err.message}`);
        appendLogMessage(`Aborting to avoid containerd inconsistency`);
        process.exit(1);
      }
    }
  }
  appendLogMessage("");
  appendLogMessage("=====================================================================");
  appendLogMessage(`Kind Docker Image Load Completed at ${new Date().toLocaleString()}`);
  appendLogMessage("=====================================================================");
  appendLogMessage(`Total Images Loaded: ${loadedImagesCount}`);
  appendLogMessage("=====================================================================");
  console.log(`All docker compose files processed. Log saved to: ${logFileAbsolutePath}`);
}

await main();
