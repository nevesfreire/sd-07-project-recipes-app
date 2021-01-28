import React, { Component } from 'react';
import Header from '../../components/header/Header';
import BarraBusca from '../../components/searchbar/BarraBusca';
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
