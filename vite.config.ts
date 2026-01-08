import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { join } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react({}),
    tsconfigPaths(),
  ],
  root: join(__dirname, 'src/client'),
  build: {
    outDir: join(__dirname, 'dist/client'),
    ssr: true,
  }
});