import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { join } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';
import { cwd } from 'process';

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react({}), tsconfigPaths()],
  root: join(cwd(), 'src/client'),
  build: {
    ssr: isSsrBuild,
    rollupOptions: {
      input: isSsrBuild
        ? resolve(cwd(), 'src/client/entry-server.tsx')
        : resolve(cwd(), 'src/client/index.html'),
    },
    outDir: isSsrBuild ? join(cwd(), 'dist/ssr') : join(cwd(), 'dist/client'),
  },
}));
