import { paraglideVitePlugin } from '@inlang/paraglide-js';
import type { UserConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default {
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
} satisfies UserConfig;
