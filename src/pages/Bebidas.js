import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';

class Bebidas extends React.Component {
  render() {
    return (
      <div>
        <Header shouldRenderSearchIcon="yes" pageTitle="Bebidas" search="drinks" />
        <RecipesList search="drinks" />
        <Footer />
      </div>
    );
  }
}

export default Bebidas;
