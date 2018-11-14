import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import MyRouter from './components/routes';
import store from './components/store';
import './public-path';

ReactDOM.render(
  <Provider store={store}>
    <MyRouter />
  </Provider>
, document.getElementById('render-target'));
