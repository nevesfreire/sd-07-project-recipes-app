import React from 'react';
import { Provider } from './context';
import Routes from './routes';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  return (
    <Provider>
      <Routes />
    </Provider>
  );
}

export default App;
