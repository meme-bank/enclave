import { SetMetadata } from '@nestjs/common';

export const VITE_RENDER_KEY = 'vite_render_view';
export const ViteRender = (view?: string) =>
  SetMetadata(VITE_RENDER_KEY, view || true);
