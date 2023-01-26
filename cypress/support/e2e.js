// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands';

// eslint-disable-next-line import/no-extraneous-dependencies
import '@cypress/code-coverage/support';

import { setConfig } from 'next/config';
import config from '../../next.config';

// Make sure you can use "publicRuntimeConfig" within tests.
setConfig(config.publicRuntimeConfig);
