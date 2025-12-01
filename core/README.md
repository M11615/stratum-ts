# Python Environment Setup Guide

## 1. Create a Virtual Environment
```bash
# Windows
python -m venv ./.venv

# Linux / macOS
python3 -m venv ./.venv
```

## 2. Activate the Virtual Environment
```bash
# Windows
./.venv/Scripts/Activate.ps1

# Linux / macOS
source ./.venv/bin/activate
```

## 3. Deactivate the Virtual Environment
```bash
deactivate
```

## 4. Install All Dependencies
```bash
pip install -r ./requirements.txt
```

## 5. Install a Specific Dependency
```bash
pip install `<package-name>`
```

## 6. Remove a Specific Dependency
```bash
pip uninstall `<package-name>`
```

## 7. Refresh requirements.txt
```bash
pip freeze > ./requirements.txt
```

## 8. Upgrade pip
```bash
python -m pip install --upgrade pip
```

## 9. Check Which Packages Can Be Upgraded
```bash
pip list --outdated
```

## 10. Check the Latest Available Version of a Specific Package
```bash
pip install `<package-name>`==
```

## 11. Upgrade a Specific Package
```bash
pip install --upgrade `<package-name>`
```
