import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  retries: {
    runMode: 1,
  },
  chromeWebSecurity: false,
  env: {
    codeCoverage: {
      url: '/api/__coverage__',
    },
  },
  e2e: {
    env: {
      API_HOST: process.env.NEXT_PUBLIC_API_HOST,
      AUTHENTICATION_HOST: process.env.NEXT_PUBLIC_GRAASP_AUTH_HOST,
      GRAASPER_ID: process.env.NEXT_PUBLIC_GRAASPER_ID,
    },
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // eslint-disable-next-line global-require, import/extensions
      require('@cypress/code-coverage/task')(on, config);

      return config;
    },
    baseUrl: 'http://localhost:3005',
  },
});
