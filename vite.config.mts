import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { join } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';
import { cwd } from 'process';

export default defineConfig(({ isSsrBuild }) => {
  const root = resolve(cwd(), 'src/client');

  return {
    plugins: [
      react({}),
      tsconfigPaths({
        root,
        projects: [resolve(cwd(), 'tsconfig.json')],
      }),
    ],
    root,
    build: {
      ssr: isSsrBuild,
      rollupOptions: {
        input: isSsrBuild
          ? resolve(cwd(), 'src/client/entry-server.tsx')
          : resolve(cwd(), 'src/client/index.html'),
      },
      outDir: isSsrBuild ? join(cwd(), 'dist/ssr') : join(cwd(), 'dist/client'),
    },
    outDir: isSsrBuild ? join(cwd(), 'dist/ssr') : join(cwd(), 'dist/client'),
    server: {
      middlewareMode: true,
      watch: {
        usePolling: true,
      },
    },
  };
});
