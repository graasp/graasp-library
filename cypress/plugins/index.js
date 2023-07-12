/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  const newConfig = {
    ...config,
    env: {
      API_HOST: process.env.NEXT_PUBLIC_API_HOST,
      AUTHENTICATION_HOST: process.env.NEXT_PUBLIC_GRAASP_AUTH_HOST,
      GRAASPER_ID: process.env.NEXT_PUBLIC_GRAASPER_ID,
    },
  };
  require('@cypress/code-coverage/task')(on, newConfig);
  return newConfig;
};
