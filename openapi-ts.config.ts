import { defineConfig } from '@hey-api/openapi-ts';

import { API_HOST } from './src/config/env';

export default defineConfig({
  input: `${API_HOST}/docs/json`,
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
