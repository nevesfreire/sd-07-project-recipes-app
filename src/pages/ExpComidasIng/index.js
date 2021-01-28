import React, { Component } from 'react';
import { Header } from '../../components';

class ExplorarComidasIng extends Component {
  render() {
    const title = 'Explorar Ingredientes';
    return (
      <div>
        <Header title={ title } />
      </div>
    );
  }
}

export default ExplorarComidasIng;
