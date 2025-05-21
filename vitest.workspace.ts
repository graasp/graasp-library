import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';
import { configDefaults, defineWorkspace } from 'vitest/config';

const queryClientInclude = 'src/query/**/*.test.ts';
// More info at: https://storybook.js.org/docs/writing-tests/vitest-plugin
export default defineWorkspace([
  {
    extends: './vite.config.js',
    test: {
      name: 'unit',
      include: ['src/**/*.test.ts'],
      exclude: [...configDefaults.exclude, queryClientInclude],
    },
  },
  {
    // add "extends" to merge two configs together
    extends: './vite.config.js',
    test: {
      include: [queryClientInclude],
      // it is recommended to define a name when using inline configs
      name: 'query',
      environment: 'happy-dom',
    },
  },
  {
    extends: 'vite.config.ts',
    plugins: [
      // See options at: https://storybook.js.org/docs/writing-tests/vitest-plugin#storybooktest
      storybookTest({ configDir: '.storybook' }),
    ],
    optimizeDeps: {
      entries: ['src/**/*.stories.tsx', '.storybook/preview.tsx'],
      include: [
        'react-dom/client',
        'react-helmet-async',
        '@graasp/stylis-plugin-rtl',
        '@emotion/cache',
        '@emotion/react',
        'stylis',
        'i18next-browser-languagedetector',
        'i18next-fetch-backend',
        '@tanstack/zod-adapter',
        'zod',
        'react-hook-form',
        '@tanstack/router-devtools',
        'date-fns/isAfter',
        'jwt-decode',
        'react-i18next',
        'react',
      ],
    },
    test: {
      include: ['src/**/*.stories.tsx'],
      name: 'storybook',
      retry: 1,
      browser: {
        enabled: true,
        headless: true,
        name: 'chromium',
        provider: 'playwright',
      },
      setupFiles: ['.storybook/vitest.setup.ts'],
    },
  },
]);
