import React from 'react';
import ReactDOM from 'react-dom';
import './styles/font-awesome.scss';
import './styles/main.scss';

/**
 * Both configureStore and Root are required conditionally.
 * See configureStore.js and Root.js for more details.
 */
import { configureStore } from './store/configureStore';
import { Root } from './containers/Root';

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
