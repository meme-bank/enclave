import React from 'react';
import ReactDOM from 'react-dom/client';
import { App, IApplicationProps } from './App';
import { BrowserRouter } from 'react-router';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const initialState =
  (window as Window & typeof globalThis & { INITIAL_STATE: IApplicationProps })
    .INITIAL_STATE || ({} as IApplicationProps);

ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <React.StrictMode>
    <BrowserRouter>
      <App {...initialState} />
    </BrowserRouter>
  </React.StrictMode>,
);
