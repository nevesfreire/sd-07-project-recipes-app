import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { CustomCardDrink, CustomFooter } from '../components';
import CustomHeader from '../components/CustomHeader';
import { updateDrinkIsFetching } from '../redux/actions';

class Drinks extends Component {
  handleRecipes() {
    const { drinks, isFetching } = this.props;
    if (!drinks.length && !isFetching) return this.renderAlertError();
    if (drinks.length === 1) return this.redirectToRecipeDetail();
    return this.renderRecipes();
  }

  redirectToRecipeDetail() {
    const { drinks } = this.props;
    return <Redirect to={ `/bebidas/${drinks[0].idDrink}` } />;
  }

  renderAlertError() {
    const { dispatchUpdateDrinkIsFetching } = this.props;
    dispatchUpdateDrinkIsFetching();
    return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  renderRecipes() {
    const { drinks } = this.props;
    const LENGTH = 12;
    const INITIAL_LENGTH = 0;
    const MAX_LENGTH = (drinks.length > LENGTH) ? LENGTH : drinks.length;
    return (
      <div>
        { drinks.slice(INITIAL_LENGTH, MAX_LENGTH)
          .map((drink, index) => (
            <CustomCardDrink key={ drink.idDrink } index={ index } drink={ drink } />)) }
      </div>
    );
  }

  render() {
    return (
      <div>
        <CustomHeader title="Bebidas" />
        { this.handleRecipes() }
        <CustomFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.drinkRecipesReducer.isFetching,
  drinks: state.drinkRecipesReducer.drinks,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateDrinkIsFetching: () => dispatch(updateDrinkIsFetching()),
});

Drinks.propTypes = {
  dispatchUpdateDrinkIsFetching: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  drinks: PropTypes.shape({
    length: PropTypes.number.isRequired,
    slice: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);
