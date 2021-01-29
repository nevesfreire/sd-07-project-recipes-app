import React, { Component } from 'react';
import { Header, Footer } from '../../components';

class ExplorarBebidas extends Component {
  render() {
    const title = 'Explorar Bebidas';
    return (
      <div>
        <Header title={ title } />
        <Footer />
      </div>
    );
  }
}

export default ExplorarBebidas;
