import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { defineConfig } from '@tanstack/react-start/config';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    preset: 'node-server',
  },
  tsr: {
    appDirectory: 'src',
  },
  vite: {
    ssr: {
      noExternal: ['@mui/*'],
    },

    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      paraglideVitePlugin({
        project: './project.inlang',
        outdir: './src/paraglide',
        // define stratgies for getting the language
        // start with the persisted setting: cookie
        // then use the locale set by the user in their browser
        // fallback to the base locale: en
        strategy: ['cookie', 'preferredLanguage', 'baseLocale'],
      }),
    ],
  },
});
