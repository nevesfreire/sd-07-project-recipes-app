import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import App from './App';
import GlobalStyles from './GlobalStyles';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={ store }>
      <App />
      <GlobalStyles />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
