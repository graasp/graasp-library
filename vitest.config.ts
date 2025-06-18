import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import tsConfigPaths from 'vite-tsconfig-paths';
import { configDefaults, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config.js';

export default mergeConfig(viteConfig, {
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['src/**/*.test.ts'],
          exclude: [...configDefaults.exclude],
        },
      },
      {
        plugins: [
          tsConfigPaths({
            projects: ['./tsconfig.json'],
          }),
          // See options at: https://storybook.js.org/docs/writing-tests/vitest-plugin#storybooktest
          storybookTest({ configDir: '.storybook' }),
        ],
        optimizeDeps: {
          entries: ['src/**/*.stories.tsx', '.storybook/preview.tsx'],
          include: [
            'react/jsx-dev-runtime',
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
          name: 'storybook',
          retry: 1,
          browser: {
            enabled: true,
            headless: true,
            instances: [{ browser: 'chromium' }],
            provider: 'playwright',
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
