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
    searchMealsCategories();
    searchRandomMeals();
  }

  render() {
    const { meals } = this.props;
    const firstMeals = meals.slice(0, 12);
    return (
      <div>
        <Header title="Comidas" />
        { firstMeals.map((meal, index) => (
          <MealCard key={ index } meals={ meal }/>
        ))}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ meals }) => (
  { meals: meals.meals }
);

const mapDispatchToProps = (dispatch) => ({
  searchMealsCategories: () => dispatch(fetchMealsCategories()),
  searchRandomMeals: () => dispatch(fetchRandomMeals()),
});

Meals.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Meals);
