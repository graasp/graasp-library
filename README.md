<p align="center">
  <a href="https://library.graasp.org/">
    <img alt="Graasp" src="https://avatars3.githubusercontent.com/u/43075056" width="300">
  </a>
</p>

<h1 align="center">Graasp Library</h1>

[![GitHub Release](https://img.shields.io/github/release/graasp/graasp-library)]()
![typescript version](https://img.shields.io/github/package-json/dependency-version/graasp/graasp-library/dev/typescript)
[![gitlocalized ](https://gitlocalize.com/repo/8977/whole_project/badge.svg)](https://gitlocalize.com/repo/8977?utm_source=badge)

<p align="center">
  <img
    alt="Screenshot"
    src="https://raw.githubusercontent.com/graasp/graasp-library/main/docs/assets/screenshot.png"
    width="900"
  >
</p>

## Getting Started

To run this app locally you need to have [Node](https://nodejs.org) and
[NPM](https://www.npmjs.com) installed on your operating system. We strongly recommend that you
also have [Yarn](https://yarnpkg.com/). All the commands that you will see here use `yarn`,
but they have an `npm` equivalent.

Download or clone the repository to your local machine, preferably using [Git](https://git-scm.com).

### Installation

Inside the project directory, run `yarn` to install the project dependencies.

You will also need to create a file called `.env.local` with the following contents.

```dotenv
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=<value>
NEXT_PUBLIC_API_HOST=<value>
NEXT_PUBLIC_GRAASP_BUILDER_HOST=<value>
NEXT_PUBLIC_GRAASP_AUTH_HOST=<value>
NEXT_PUBLIC_GRAASP_PERFORM_HOST=<value>
NEXT_PUBLIC_GRAASP_ANALYTICS_HOST=<value>
```

In order to ensure that you can contribute and test, also create a file called `.env.test`.
You can leave this file empty.

### Running Locally

Navigate to the cloned or forked project directory using the command-line, then type `yarn start`.
The app will automatically run on `localhost:3000`. Any changes you make should be automatically
rendered in the browser.

### `npm start` or `yarn start`

Runs the project in development mode.  
You can view your application at `http://localhost:3000`

The page will reload if you make edits.

### `npm run build` or `yarn build`

Builds the app for production to the build folder.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### `npm run start:prod` or `yarn start:prod`

Runs the compiled app in production.

You can again view your application at `http://localhost:3000`

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.
