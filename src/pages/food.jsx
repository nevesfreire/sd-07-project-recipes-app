import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ListCards from '../components/ListCards';

function Comidas() {
  return (
    <section className="header-container">
      <div className="header-page">
        <Header />
      </div>
      <div className="cards-container">
        <ListCards />
      </div>
      <Footer />
    </section>
  );
}

export default Comidas;
