import React from 'react';
import { renderToString } from 'react-dom/server';
import { App, IApplicationProps } from './App';

export function render(url: string, data: IApplicationProps) {
  const element = (
    <React.StrictMode>
      <App {...data} />
    </React.StrictMode>
  );

  const html = renderToString(element);

  return { html };
}
