# Stratum-TS

**Stratum-TS** is a TypeScript-based full-stack application framework employing a frontend-backend separation architecture. It incorporates modern engineering configurations, making it well-suited as the foundational engineering framework for medium to large-scale web and AI applications.

## Features

- Monorepo architecture (Client/Server decoupling)
- Full TypeScript support
- Next.js-based frontend application
- Built-in Docker support
- Modern engineering toolchain (ESLint / Yarn / PostCSS)
- Suitable for secondary development and commercial deployment

## Project Structure

```
stratum-ts
├─ client/          # Frontend (Next.js)
├─ server/          # Backend (Nest.js)
├─ initialisation/  # Container and environment bootstrap scripts
├─ scripts/         # Project automation and maintenance utilities
└─ README.md
```

## Quick Start

### 1. Clone the project

```bash
git clone https://github.com/M11615/stratum-ts.git
cd ./stratum-ts
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Initialise the configuration environment

```bash
node ./scripts/setup-env.mjs
```

### 4. Launch development environment

```bash
yarn dev
```

## Technology Stack

- TypeScript
- Next.js
- Nest.js
- Yarn Berry
- Docker

## Roadmap

- [ ] Plugin architecture
- [ ] Multi-AI provider adaptation
- [ ] Windows automation capabilities (planned)
- [ ] Internationalisation support (i18n)

## Contributing

Contributions are welcome via Issues or Pull Requests. Please review [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting.

## Licence

This project is open-sourced under the **Apache-2.0** licence. For details, see [LICENSE](./LICENSE).
