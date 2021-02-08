import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import CategorySelector from '../components/CategorySelector';

class Bebidas extends React.Component {
  render() {
    const { drinkRecipes } = this.props;
    if (drinkRecipes.length === 1) {
      const { idDrink } = drinkRecipes[0];
      return <Redirect to={ `/bebidas/${idDrink}` } />;
    }

    return (
      <div>
        <Header shouldRenderSearchIcon="yes" pageTitle="Bebidas" search="drinks" />
        <CategorySelector search="drinks" />
        <RecipesList search="drinks" />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ recipes: { drinkRecipes } }) => (
  { drinkRecipes }
);

Bebidas.propTypes = {
  drinkRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Bebidas);
