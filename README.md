# Graasp Library

![GitHub Release](https://img.shields.io/github/release/graasp/graasp-library)
![typescript version](https://img.shields.io/github/package-json/dependency-version/graasp/graasp-library/dev/typescript)
[![gitlocalized](https://gitlocalize.com/repo/8977/whole_project/badge.svg)](https://gitlocalize.com/repo/8977?utm_source=badge)

<p align="center">
  <img
    alt="Screenshot"
    src="https://raw.githubusercontent.com/graasp/graasp-library/main/docs/assets/screenshot.v2.png"
    width="900"
  >
</p>

## Getting Started

To run this app locally you need to have [Node](https://nodejs.org) and
[NPM](https://www.npmjs.com) installed on your operating system. You will also need [PNPM](https://pnpm.io/installation) for managing packages.

Download or clone the repository to your local machine, preferably using [Git](https://git-scm.com).

### Installation

1. Inside the project directory, run `pnpm i` to install the project dependencies.
1. Optionally create a `.env.development` file to override necessary settings. The content should be the following:

   ```dotenv
   # URL of the backend server. Uncomment to override the default value
   # VITE_API_HOST=http://localhost:3000
   # VITE_CLIENT_HOST=http://localhost:3114
   # VITE_HOST=http://localhost:3002

   # for tests
   # VITE_PORT=3002

   # Uncomment to use Sentry locally (not recommended)
   # SENTRY_DSN=
   # SENTRY_ENV=local-dev

   # These are usually set by the docker build stage, but you can provide them
   # APP_VERSION=local-dev
   # BUILD_TIMESTAMP=latest

   # Silence dotenv log messages
   DOTENV_CONFIG_QUIET=true
   ```

### Running Locally

Inside the project directory, run: `pnpm dev`.
The app will be available on [`http://localhost:3002`](http://localhost:3002). Open this url in your browser. Any changes you make should be automatically rendered in the browser.
If you update env variables you will have to restart the server.

### Running on a different port

If you wish to run the application on a different port, use the following command (replace `<other-port>` with e.g. `3333` for the app to be accessible at `http://localhost:3333`):

```sh
pnpm vite dev --port <other-port>
```

## Testing

### Unit tests

Unit tests are performed with [`vitest`](https://vitest.dev/).
Start tests with `pnpm vitest`

### Integration tests

We run integration tests with Playwright.
Create a `.env.test` file with the following content:

```dotenv
# URL of the backend server. Uncomment to override the default value
VITE_API_HOST=http://localhost:3000
VITE_CLIENT_HOST=http://localhost:3114
VITE_HOST=http://localhost:3002

# for tests
VITE_PORT=3002

# Uncomment to use Sentry locally (not recommended)
# SENTRY_DSN=
# SENTRY_ENV=local-dev

# These are usually set by the docker build stage, but you can provide them
# APP_VERSION=local-dev
# BUILD_TIMESTAMP=latest
```

Start tests with `pnpm playwright test --ui` to open an interactive interface.
To run the tests in the command line: `pnpm playwright test`. To mimic the CI behavior: `CI=true pnpm playwright test` (will run the tests with a single worker -> slower).

You can open a trace from the CI locally with playwright using `pnpm playwright show-report <path-to-extracted-report-file>` this will allow you to explore the report and view execution as it happened in the CI (very useful).

## Technology stack

We use:

- Tanstack Start as the SSR framework
- Tanstack Query for the async state manager (integrates very well with tanstack start)
- Hey Api for request generation from the backend's openAPI spec
- Material UI for the UI components
- Inlang ParaglideJS for translations
- Storybook and Vitest for design library and unit testing
- Playwright for end to end testing
