import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    sourcemap: true, // Source map generation must be turned on
    rollupOptions: {
      external: ['@gsap/react', 'gsap'],
    },
  },
  ssr: {
    noExternal: ['@mui/*'],
  },
  plugins: [
    tsconfigPaths({
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
    tanstackStart({ customViteReactPlugin: true }),
    viteReact(),
    process.env.SENTRY_AUTH_TOKEN
      ? sentryVitePlugin({
          // disable sentry telemetry
          telemetry: false,
          org: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT,

          // Auth tokens can be obtained from https://sentry.io/orgredirect/organizations/:orgslug/settings/auth-tokens/
          authToken: process.env.SENTRY_AUTH_TOKEN,
        })
      : undefined,
  ],
});
