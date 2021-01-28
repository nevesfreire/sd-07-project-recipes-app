import React, { Component } from 'react';
import Header from '../../components/header/Header';
import BarraBuscaComidas from '../../components/searchbar/BarraBuscaComidas';
import Footer from '../../components/footer/Footer';

class Comidas extends Component {
  render() {
    return (
      <div>
        <Header title="Comidas" />
        <BarraBuscaComidas />
        <Footer />
      </div>
    );
  }
}

export default Comidas;
