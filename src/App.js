import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
import { Provider } from './context';
import Routes from './routes';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider>
      {/* <BrowserRouter> */}
      <Routes />
      {/* </BrowserRouter> */}
    </Provider>
  );
}

export default App;
