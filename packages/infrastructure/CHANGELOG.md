# infrastructure

## 0.9.1

### Patch Changes

- 5e35912: Specifiy resource limits for all services to control CPU usage

## 0.9.0

### Minor Changes

- f1923be: Build and push Docker images from GitHub Actions to GitHub Artifactory
- f1923be: Deploy via Docker images to server

## 0.8.0

### Minor Changes

- 61ae57a: Update all dependencies to minor version

## 0.7.1

### Patch Changes

- 393f871: Refactor Dockerfiles with new nx build
- 1bebdff: Fix infrastructure configuration by starting ollama instance

## 0.7.0

### Minor Changes

- 33b9fc2: Switch to nodejs version 20

### Patch Changes

- edc81fc: Skip CRON job execution on development environment

## 0.6.1

### Patch Changes

- ea0750c: Restart OLLAMA to apply network configuration

## 0.6.0

### Minor Changes

- 78be7f1: Add ollama to infrastructure setup

## 0.5.1

### Patch Changes

- be40a54: Upgrade node version of impromat app to 18 to use fetch api

## 0.5.0

### Minor Changes

- f99a4ea: Disable building of improbib for app deployment

## 0.4.0

### Minor Changes

- b7eb73a: Install complete workspace for impromat-app.

## 0.3.1

### Patch Changes

- 3a68053: Switch to `docker compose` command.

## 0.3.0

### Minor Changes

- 0df9714: Optimize Docker build of impromat app.

## 0.2.1

### Patch Changes

- 8722621: Fix development environment configuration script

## 0.2.0

### Minor Changes

- 55f5f07: Restructure scripts into development and production configurations.
- fe6bca7: Adjust impromat-app Dockerfile to host with the impromat-app-renderer package.

### Patch Changes

- affa2d4: Add necessary dependencies in Dockerfile to allow Puppeteer installation.

## 0.1.3

### Patch Changes

- abbd7dd: Fix production environment by not applying the development environment configuration.

## 0.1.2

### Patch Changes

- 33953f9: Switch to main branch for dokku deployment.

## 0.1.1

### Patch Changes

- 2172036: Add development environment at dev.impromat.app
- 55e603b: Update Readme documentation with getting started guide
- 252b75a: Limit dev package version to random 3 digit number.
