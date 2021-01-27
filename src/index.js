import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <Provider store={ store }>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'),
);

serviceWorker.unregister();
