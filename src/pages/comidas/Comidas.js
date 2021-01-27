import React, { Component } from 'react';
import {
  Header,
  BarraBusca } from '../../components/header';
import Footer from '../../components/footer/Footer';

class Comidas extends Component {
  render() {
    return (
      <div>
        <Header title="Comidas" />
        <BarraBusca />
        <Footer />
      </div>
    );
  }
}

export default Comidas;
