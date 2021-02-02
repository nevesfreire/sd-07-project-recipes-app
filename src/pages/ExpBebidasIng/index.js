import React, { Component } from 'react';
import { Header, Footer } from '../../components';
import 'bootstrap/dist/css/bootstrap.min.css';

class ExplorarBebidasIng extends Component {
  render() {
    const title = 'Explorar Ingredientes';
    return (
      <div>
        <Header title={ title } />
        <Footer />
      </div>
    );
  }
}

export default ExplorarBebidasIng;
