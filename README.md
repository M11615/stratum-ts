# Stratum-ts

Stratum-ts is a full-stack TypeScript monorepo that combines a modern web client with a structured backend service.  
The project is designed with modularity, internationalization, and containerized development in mind.

This repository contains everything required to run the server and client either locally or via Docker.

---

## Features

- **Full-stack TypeScript** using a single monorepo
- **Backend service** built with Nest.js
- **Client-side application** built with Next.js
- **Internationalization (i18n)** support for multiple locales
- **Docker & Docker Compose** support for local development
- **Yarn & TurboRepo** for dependency and task management

---

## Requirements

To work with this project locally, you will need:

- **Node.js** (LTS recommended)
- **Yarn**
- **Docker** (optional, recommended for consistent environments)

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
docker-compose up
```

This will start all required services defined in `docker-compose.yml`.

### Local Development (Without Docker)

You may also run the server and client independently.

#### Server

```bash
cd server
yarn start:dev
```

#### Client

```bash
cd client
yarn dev
```

Refer to each subproject's configuration files for environment variables and runtime options.

---

## Internationalization (i18n)

Both the client and server include structured internationalization support.

- Locale resources are stored under:
  - `server/src/i18n/`
  - `client/src/i18n/locales/`
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
