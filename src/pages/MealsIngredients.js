import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';
import {
  fetchMealsIngredients,
} from '../actions/meals';

class MealsIngredients extends Component {
  componentDidMount() {
    const { searchMealsIngredients } = this.props;
    searchMealsIngredients();
  }

  render() {
    const zero = 0;
    const maxLength = 12;
    const { ingredients } = this.props;
    const firstIngredients = ingredients.slice(zero, maxLength);
    return (
      <div>
        <Header title="Comidas" />
        { firstIngredients.map((ingredient, index) => (
          <IngredientCard key={ index } ingredients={ ingredient } index={ index } />
        ))}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ ingredients }) => ({
  ingredients: ingredients.ingredients,
});

const mapDispatchToProps = (dispatch) => ({
  searchMealsCategories: () => dispatch(fetchMealsIngredients()),
});

MealsIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  searchMealsIngredients: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MealsIngredients);
