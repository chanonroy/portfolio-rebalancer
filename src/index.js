import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './views/App';
import 'element-theme-default';
import './scss/main.scss';
import './assets/_assets.js';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
