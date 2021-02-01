import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MealCard from '../components/MealCard';
import {
  fetchRandomMeals,
  fetchMealsCategories,
} from '../actions/meals';

class Meals extends Component {
  componentDidMount() {
    const { searchMealsCategories, searchRandomMeals } = this.props;
    searchRandomMeals();
    searchMealsCategories();
  }

  render() {
    const zero = 0;
    const maxLength = 12;
    const { meals } = this.props;
    const firstMeals = meals.slice(zero, maxLength);
    return (
      <div>
        <Header title="Comidas" />
        { firstMeals.map((meal, index) => (
          <MealCard key={ index } meals={ meal } index={ index } />
        ))}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ meals }) => ({
  meals: meals.meals,
});

const mapDispatchToProps = (dispatch) => ({
  searchMealsCategories: () => dispatch(fetchMealsCategories()),
  searchRandomMeals: () => dispatch(fetchRandomMeals()),
});

Meals.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  searchMealsCategories: PropTypes.func.isRequired,
  searchRandomMeals: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Meals);
