import React from 'react';
import ReactDOM from 'react-dom/client';
import { App, IApplicationProps } from './App';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const initialState =
  (window as Window & typeof globalThis & { hydrate: IApplicationProps })
    .hydrate || ({} as IApplicationProps);

ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <React.StrictMode>
    <App {...initialState} />
  </React.StrictMode>,
);
