import { wrapVinxiConfigWithSentry } from '@sentry/tanstackstart-react';
import { defineConfig } from '@tanstack/react-start/config';

import viteConfig from './vite.config';

const config = defineConfig({
  server: {
    preset: 'node-server',
  },
  tsr: {
    appDirectory: 'src',
  },
  vite: viteConfig,
});

export default wrapVinxiConfigWithSentry(config, {
  org: 'graasp',
  project: 'library',
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Only print logs for uploading source maps in CI
  // Set to `true` to suppress logs
  silent: !process.env.CI,
});
