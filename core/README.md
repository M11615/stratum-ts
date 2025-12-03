# Python Environment Setup Guide

## Create a Virtual Environment
```bash
# Windows
python -m venv ./.venv

# Linux / macOS
python3 -m venv ./.venv
```

## Activate the Virtual Environment
```bash
# Windows
./.venv/Scripts/Activate.ps1

# Linux / macOS
source ./.venv/bin/activate
```

## Upgrade pip
```bash
python -m pip install --upgrade --no-cache-dir pip
```

## Install pip-tools (for dependency compilation)
```bash
pip install --no-cache-dir pip-tools
```

## Compile requirements.txt from requirements.in
```bash
pip-compile --output-file=./requirements.txt ./requirements.in
```

## Install All Dependencies
```bash
pip install --no-cache-dir -r ./requirements.txt
```

## Install a Specific Dependency
```bash
pip install --no-cache-dir `<package-name>`
```

## Remove a Specific Dependency
```bash
pip uninstall `<package-name>`
```

## Refresh requirements.txt
```bash
# pip-tools
pip-compile --output-file=./requirements.txt ./requirements.in

# pip
pip freeze > ./requirements.txt
```

## Check Which Packages Can Be Upgraded
```bash
# pip-tools
pip-compile --upgrade --output-file=./requirements.txt ./requirements.in

# pip
pip list --outdated
```

## Install or Synchronize Dependencies
```bash
pip-sync ./requirements.txt
```

## Check the Latest Available Version of a Specific Package
```bash
pip search `<package-name>`
pip show `<package-name>`
```

## Upgrade a Specific Package
```bash
pip install --upgrade --no-cache-dir `<package-name>`
```

## Clear pip Cache
```bash
pip cache purge
```

## Deactivate the Virtual Environment
```bash
deactivate
```
