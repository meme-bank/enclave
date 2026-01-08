import React from 'react';
import ReactDOM from 'react-dom/client';
import { App, IApplicationProps } from './App';

// Получаем данные, которые сервер "вклеил" в window
const initialState =
  (window as Window & typeof globalThis & { hydrate: IApplicationProps })
    .hydrate || ({} as IApplicationProps);

ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <React.StrictMode>
    <App {...initialState} />
  </React.StrictMode>,
);
