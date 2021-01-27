import React, { Component } from 'react';
import {
  Header,
  BarraBusca } from '../../components/header';

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
