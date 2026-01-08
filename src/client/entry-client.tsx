import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

// Получаем данные, которые сервер "вклеил" в window
const initialState = (window as any).hydrate || {};

ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <React.StrictMode>
    <App {...initialState} />
  </React.StrictMode>
);