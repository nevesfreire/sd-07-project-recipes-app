import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class MainRecipes extends React.Component {
  render() {
    return (
      <div>
        <Header shouldRenderSearchIcon="yes" pageTitle="Comidas" search="meals" />
        <Footer />
      </div>
    );
  }
}

export default MainRecipes;
