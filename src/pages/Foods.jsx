import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { CustomCardFood, CustomFooter, CustomCartegory } from '../components';
import CustomHeader from '../components/CustomHeader';
import {
  listFoodRecipes,
  updateFoodIsFetching,
  allCategoriesFoodsAction,
} from '../redux/actions/foodRecipesAction';

class Foods extends Component {
  constructor() {
    super();
    this.handleRecipes = this.handleRecipes.bind(this);
    this.redirectToRecipeDetail = this.redirectToRecipeDetail.bind(this);
    this.renderAlertError = this.renderAlertError.bind(this);
    this.renderRecipes = this.renderRecipes.bind(this);
  }

  componentDidMount() {
    const { dispatchInitialCards, dispatchAllCategories } = this.props;
    const urlForMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const urlForAllCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

    const fetchMeals = async () => {
      const requestMeals = await fetch(urlForMeals);
      const JSONRequestMeals = await requestMeals.json();
      dispatchInitialCards(JSONRequestMeals);
    };
    fetchMeals();

    const fetchAllCategories = async () => {
      const requestAllCategories = await fetch(urlForAllCategories);
      const JSONRequestAllCAtegories = await requestAllCategories.json();
      dispatchAllCategories(JSONRequestAllCAtegories);
    };

    fetchAllCategories();
  }

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
            <CustomCardFood key={ meal.idMeal } index={ index } meal={ meal } />))}
      </div>
    );
  }

  renderCategories() {
    const { categories } = this.props;
    const mealsCategories = categories.meals;
    const MAX_LENGTH = 5;
    const INITIAL_LENGTH = 0;
    if (mealsCategories !== undefined) {
      return (
        <div>
          { mealsCategories.slice(INITIAL_LENGTH, MAX_LENGTH)
            .map((category, index) => (
              <CustomCartegory key={ index } index={ index } category={ category } />))}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <CustomHeader title="Comidas" />
        { this.renderCategories()}
        { this.handleRecipes()}
        <CustomFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.foodRecipesReducer.isFetching,
  meals: state.foodRecipesReducer.meals,
  categories: state.foodRecipesReducer.categories,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAllCategories: (allCategories) => {
    dispatch(allCategoriesFoodsAction(allCategories));
  },
  dispatchInitialCards: (JSONRequestAllCAtegories) => {
    dispatch(listFoodRecipes(JSONRequestAllCAtegories));
  },
  dispatchUpdateFoodIsFetching: () => dispatch(updateFoodIsFetching()),
});

Foods.propTypes = {
  dispatchUpdateFoodIsFetching: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatchInitialCards: PropTypes.func.isRequired,
  dispatchAllCategories: PropTypes.func.isRequired,
  meals: PropTypes.shape({
    length: PropTypes.number.isRequired,
    slice: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
