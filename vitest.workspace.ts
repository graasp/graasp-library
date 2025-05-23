import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';
import { configDefaults, defineWorkspace } from 'vitest/config';

// More info at: https://storybook.js.org/docs/writing-tests/vitest-plugin
export default defineWorkspace([
  {
    extends: './vite.config.ts',
    test: {
      name: 'unit',
      include: ['src/**/*.test.ts'],
      exclude: [...configDefaults.exclude],
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
        '@graasp/stylis-plugin-rtl',
        '@emotion/cache',
        '@emotion/react',
        'stylis',
        '@tanstack/zod-adapter',
        'zod',
        'react-hook-form',
        '@tanstack/router-devtools',
        'date-fns/isAfter',
        'jwt-decode',
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
