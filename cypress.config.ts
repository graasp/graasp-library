// eslint-disable-next-line import/no-extraneous-dependencies
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
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // eslint-disable-next-line global-require, import/extensions
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'http://localhost:3005',
  },
});
