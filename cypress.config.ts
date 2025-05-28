import setupCoverage from '@cypress/code-coverage/task.js';
import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  retries: {
    runMode: 1,
  },
  chromeWebSecurity: false,

  e2e: {
    env: {
      VITE_API_HOST: process.env.VITE_API_HOST,
    },
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      setupCoverage(on, config);

      return config;
    },
    baseUrl: 'http://localhost:3002',
  },
});
