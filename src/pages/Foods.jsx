import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { CustomCardFood, CustomFooter } from '../components';
import CustomHeader from '../components/CustomHeader';
import { updateFoodIsFetching } from '../redux/actions';

class Foods extends Component {
  handleRecipes() {
    const { meals, isFetching } = this.props;
    if (!meals.length && !isFetching) return this.renderAlertError();
    if (meals.length === 1) return this.redirectToRecipeDetail();
    return this.renderRecipes();
  }

  redirectToRecipeDetail() {
    const { meals } = this.props;
    return <Redirect to={ `/comidas/${meals[0].idMeal}` } />;
  }

  renderAlertError() {
    const { dispatchUpdateFoodIsFetching } = this.props;
    dispatchUpdateFoodIsFetching();
    return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  renderRecipes() {
    const { meals } = this.props;
    const LENGTH = 12;
    const INITIAL_LENGTH = 0;
    const MAX_LENGTH = (meals.length > LENGTH) ? LENGTH : meals.length;
    return (
      <div>
        { meals.slice(INITIAL_LENGTH, MAX_LENGTH)
          .map((meal, index) => (
            <CustomCardFood key={ meal.idMeal } index={ index } meal={ meal } />)) }
      </div>
    );
  }

  render() {
    return (
      <div>
        <CustomHeader title="Comidas" />
        { this.handleRecipes() }
        <CustomFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.foodRecipesReducer.isFetching,
  meals: state.foodRecipesReducer.meals,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateFoodIsFetching: () => dispatch(updateFoodIsFetching()),
});

Foods.propTypes = {
  dispatchUpdateFoodIsFetching: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  meals: PropTypes.shape({
    length: PropTypes.number.isRequired,
    slice: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
