import React, { Component } from 'react';
import { Header } from '../../components';

class ExplorarBebidas extends Component {
  render() {
    const title = 'Explorar Bebidas';
    return (
      <div>
        <Header title={ title } />
      </div>
    );
  }
}

export default ExplorarBebidas;
