import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MealsIngredientCard from '../components/MealsIngredientCard';
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
    const { mealsIngredients } = this.props;
    const firstIngredients = mealsIngredients.slice(zero, maxLength);
    return (
      <div>
        <Header title="Comidas" />
        { firstIngredients.map((ingredient, index) => (
          <MealsIngredientCard key={ index } ingredient={ ingredient } index={ index } />
        ))}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ meals }) => ({
  mealsIngredients: meals.mealsIngredients,
});

const mapDispatchToProps = (dispatch) => ({
  searchMealsIngredients: () => dispatch(fetchMealsIngredients()),
});

MealsIngredients.propTypes = {
  mealsIngredients: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  searchMealsIngredients: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MealsIngredients);
