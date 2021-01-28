import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MealRecipes from '../components/MealRecipes';
import '../css/food.css';

class Food extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header history={ history } />
        <MealRecipes endPoint="https://www.themealdb.com/api/json/v1/1/search.php?s=" />
        <Footer history={ history } />
      </div>
    );
  }
}

export default Food;

Food.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
