import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ListCards from '../components/ListCards';
import CategoryPanel from '../components/CategoryPanel';

function Recipes() {
  return (
    <section className="header-container background">
      <div className="header-page">
        <Header />
      </div>
      <div className="category-buttons">
        <CategoryPanel />
      </div>
      <div className="cards-container">
        <ListCards />
      </div>
      <Footer />
    </section>
  );
}

export default Recipes;
