// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from '@hey-api/openapi-ts';

import { GRAASP_API_HOST } from './src/config/env';

export default defineConfig({
  input: `${GRAASP_API_HOST}/docs/json`,
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/openapi/client',
  },
  plugins: [
    '@tanstack/react-query',
    {
      name: '@hey-api/client-fetch',
      runtimeConfigPath: './src/openapi/clientConfig.ts',
    },
  ],
});
