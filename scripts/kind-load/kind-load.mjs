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
}

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
  const totalDockerComposeCount = dockerComposePaths.length;
  appendLogMessage("=====================================================================");
  appendLogMessage(`Kind Docker-Image Load Process Started at ${new Date().toLocaleString()}`);
  appendLogMessage(`Docker Compose file list: ${dockerComposeListFilePath}`);
  appendLogMessage("=====================================================================");
  let loadedImagesCount = 0;
  for (const dockerComposePath of dockerComposePaths) {
    appendLogMessage("");
    appendLogMessage("-------------------------------------------------------------");
    appendLogMessage(`Processing docker compose: ${dockerComposePath}`);
    appendLogMessage("-------------------------------------------------------------");
    if (fs.existsSync(dockerComposePath)) {
      const composeContent = fs.readFileSync(dockerComposePath, "utf8");
      const compose = yaml.load(composeContent);
      if (!compose.services) {
        appendLogMessage(`WARNING: No services found in ${dockerComposePath}`);
        continue;
      }
      for (const [serviceName, service] of Object.entries(compose.services)) {
        if (service.image) {
          appendLogMessage(`Loading image for service "${serviceName}": ${service.image}`);
          try {
            const { stdout, stderr } = await executeCommandAsync(`kind load docker-image ${service.image}`);
            if (stdout) appendLogMessage(stdout.trim());
            if (stderr) appendLogMessage(stderr.trim());
            loadedImagesCount++;
          } catch (error) {
            appendLogMessage(`ERROR: Failed to load image "${service.image}" for service "${serviceName}": ${error.message}`);
          }
        } else {
          appendLogMessage(`Service "${serviceName}" has no image defined, skipping.`);
        }
      }
    } else {
      appendLogMessage(`Warning: Docker compose file "${dockerComposePath}" does not exist.`);

    }
  }
  appendLogMessage("");
  appendLogMessage("=====================================================================");
  appendLogMessage(`Kind Docker-Image Load Process Completed at ${new Date().toLocaleString()}`);
  appendLogMessage("=====================================================================");
  appendLogMessage(`Processed Docker Compose Count: ${totalDockerComposeCount}`);
  appendLogMessage(`Total Images Loaded into Kind: ${loadedImagesCount}`);
  appendLogMessage("=====================================================================");
  console.log(`All docker compose files processed. Log saved to: ${logFileAbsolutePath}`);
}

await main();
