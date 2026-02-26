# StratumTS

StratumTS is a full-stack TypeScript monorepo that combines a modern web client with a structured backend service.
The project is designed with modularity, internationalization, containerized development, and Kubernetes deployment in mind.

This repository contains everything required to run the server and client either locally, via Docker, or in a Kubernetes cluster.

---

## Features

- **Full-stack TypeScript** using a single monorepo
- **Backend service** built with Nest.js
- **Client-side application** built with Next.js
- **Internationalization (i18next)** support for multiple locales
- **Docker & Docker Compose** support for local development
- **Kubernetes** manifests for container orchestration
- **Yarn & Turborepo** for dependency and task management

---

## Requirements

To work with this project locally, you will need:

- **Node.js** (LTS recommended)
- **Yarn**
- **Docker** (optional, recommended for consistent environments)
- **kubectl** and **Kubernetes cluster** (optional, required for Kubernetes deployment)

---

## Installation

Install all workspace dependencies from the repository root:

```bash
yarn install
```

---

## Development

### Running with Docker

The easiest way to run the full stack is via Docker Compose:

```bash
yarn docker:build
yarn docker:up
```

This will start all required services defined in `./deploy/docker/docker-compose.yaml`.

### Running with Kubernetes

You can deploy StratumTS to a Kubernetes cluster using Kustomize:

```bash
yarn kubernetes:configmap
yarn kubernetes:apply
```

This will apply all resources defined in `./deploy/kubernetes/base/kustomization.yaml` and `./deploy/kubernetes/pv/kustomization.yaml`.

### Local Development (Without Docker and Kubernetes)

You may also run the server and client independently.

#### Server

```bash
cd ./server
yarn start:dev
```

#### Client

```bash
cd ./client
yarn dev
```

#### All

```bash
yarn dev
```

Refer to each subproject's configuration files for environment variables and runtime options.

---

## Internationalization (i18n)

Both the client and server include structured internationalization support.

- Locale resources are stored under:
  - `./server/src/i18n/`
  - `./client/src/i18n/locales/`
- i18n configuration is centralized and extensible for additional languages.

---

## Docker

Each major component includes its own `Dockerfile`.  
The root `docker-compose.yml` coordinates service startup and networking.

Docker is recommended for development parity and simplified setup.

---

## Project Status

This project is actively maintained as a general-purpose codebase and technical foundation.  
Updates and improvements are made as needed.

---

## License

This project is licensed under the **Apache License 2.0**.  
See the [LICENSE](LICENSE) file for full details.
