import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { CustomCardDrink, CustomCartegory, CustomFooter } from '../components';
import CustomHeader from '../components/CustomHeader';
import {
  listDrinkRecipes,
  updateDrinkIsFetching,
  allCategoriesDrinksAction,
} from '../redux/actions';

class Drinks extends Component {
  constructor() {
    super();
    this.handleRecipes = this.handleRecipes.bind(this);
    this.redirectToRecipeDetail = this.redirectToRecipeDetail.bind(this);
    this.renderAlertError = this.renderAlertError.bind(this);
    this.renderRecipes = this.renderRecipes.bind(this);
  }

  componentDidMount() {
    const { dispatchInitialCards, dispatchAllCategories } = this.props;
    const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const urlAllCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

    const fetchDrinks = async () => {
      const requestAllCategories = await fetch(urlDrinks);
      const JSONRequestAllCAtegories = await requestAllCategories.json();
      dispatchInitialCards(JSONRequestAllCAtegories);
    };
    fetchDrinks();

    const fetchAllCategories = async () => {
      const requestAllCategories = await fetch(urlAllCategories);
      const JSONRequestAllCAtegories = await requestAllCategories.json();
      dispatchAllCategories(JSONRequestAllCAtegories);
    };

    fetchAllCategories();
  }

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
            <CustomCardDrink key={ drink.idDrink } index={ index } drink={ drink } />))}
      </div>
    );
  }

  renderCategories() {
    const { categories: { drinks } } = this.props;
    const MAX_LENGTH = 5;
    const INITIAL_LENGTH = 0;
    if (drinks !== undefined) {
      return (
        <div>
          { drinks.slice(INITIAL_LENGTH, MAX_LENGTH)
            .map((category, index) => (
              <CustomCartegory
                key={ index }
                index={ index }
                category={ category }
                title="Bebidas"
              />))}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <CustomHeader title="Bebidas" />
        { this.renderCategories()}
        { this.handleRecipes()}
        <CustomFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.drinkRecipesReducer.isFetching,
  drinks: state.drinkRecipesReducer.drinks,
  categories: state.drinkRecipesReducer.categories,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAllCategories: (allCategories) => {
    dispatch(allCategoriesDrinksAction(allCategories));
  },
  dispatchInitialCards: (JSONRequestAllCAtegories) => {
    dispatch(listDrinkRecipes(JSONRequestAllCAtegories));
  },
  dispatchUpdateDrinkIsFetching: () => dispatch(updateDrinkIsFetching()),
});

Drinks.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchUpdateDrinkIsFetching: PropTypes.func.isRequired,
  dispatchInitialCards: PropTypes.func.isRequired,
  dispatchAllCategories: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  drinks: PropTypes.shape({
    length: PropTypes.number.isRequired,
    slice: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);
