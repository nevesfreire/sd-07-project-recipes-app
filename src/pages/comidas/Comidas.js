import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import BarraBusca from '../../components/Header/BarraBusca';

class Comidas extends Component {
  render() {
    return (
      <div>
        <Header title="Comidas" />
        <BarraBusca />
      </div>
    );
  }
}

export default Comidas;
