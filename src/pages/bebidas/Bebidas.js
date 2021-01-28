import React from 'react';
import Header from '../../components/header/Header';
import BarraBuscaBebidas from '../../components/searchbar/BarraBuscaBebidas';
import Footer from '../../components/footer/Footer';

export default class Bebidas extends React.Component {
  render() {
    return (
      <div>
        <Header title="Bebidas" />
        <BarraBuscaBebidas />
        <Footer />
      </div>
    );
  }
}
