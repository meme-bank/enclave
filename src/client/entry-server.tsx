import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';

export function render(url: string, data: any) {
  const element = (
    <React.StrictMode>
      <App {...data} />
    </React.StrictMode>
  );

  const html = renderToString(element);

  return { html };
}