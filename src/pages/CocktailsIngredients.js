import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CocktailsIngredientCard from '../components/CocktailsIngredientCard';
import {
  fetchCocktailsIngredients,
} from '../actions/cocktails';

class CocktailsIngredients extends Component {
  componentDidMount() {
    const { searchCocktailsIngredients } = this.props;
    searchCocktailsIngredients();
  }

  render() {
    const zero = 0;
    const maxLength = 12;
    const { cocktailsIngredients } = this.props;
    const firstIngredients = cocktailsIngredients.slice(zero, maxLength);
    return (
      <div>
        <Header title="Bebidas" />
        { firstIngredients.map((ingredient, index) => (
          <CocktailsIngredientCard key={ index } ingredient={ ingredient } index={ index } />
        ))}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ cocktails }) => ({
  cocktailsIngredients: cocktails.cocktailsIngredients,
});

const mapDispatchToProps = (dispatch) => ({
  searchCocktailsIngredients: () => dispatch(fetchCocktailsIngredients()),
});

CocktailsIngredients.propTypes = {
  cocktailsIngredients: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  searchCocktailsIngredients: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CocktailsIngredients);
