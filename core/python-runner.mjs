#!/usr/bin/env node

import path from "path";
import { spawn } from "child_process";

const isWindowsPlatform = process.platform === "win32";
const pythonExecutablePath = isWindowsPlatform
  ? path.join(".venv", "Scripts", "python.exe")
  : path.join(".venv", "bin", "python");
const pythonExecutable = pythonExecutablePath;
const commandArguments = process.argv.slice(2);

const pythonProcess = spawn(pythonExecutable, commandArguments, {
  stdio: "inherit"
});

pythonProcess.on("exit", (exitCode) => {
  process.exit(exitCode);
});
