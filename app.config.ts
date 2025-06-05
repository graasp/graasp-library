import { defineConfig } from '@tanstack/react-start/config';

import viteConfig from './vite.config';

export default defineConfig({
  server: {
    preset: 'node-server',
  },
  tsr: {
    appDirectory: 'src',
  },
  vite: viteConfig,
});
