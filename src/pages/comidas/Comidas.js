import React, { Component } from 'react';
import Header from '../../components/header/Header';
import BarraBusca from '../../components/header/BarraBusca';

class Comidas extends Component {
  render() {
    return (
      <div>
        <Header />
        <BarraBusca />
      </div>
    );
  }
}

export default Comidas;
