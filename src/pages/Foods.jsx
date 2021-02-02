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
import { getAllFoodCategories, getFoodRecipes } from '../services';

class Foods extends Component {
  constructor() {
    super();
    this.handleRecipes = this.handleRecipes.bind(this);
    this.redirectToRecipeDetail = this.redirectToRecipeDetail.bind(this);
    this.renderAlertError = this.renderAlertError.bind(this);
    this.renderRecipes = this.renderRecipes.bind(this);
    this.handleCategories = this.handleCategories.bind(this);
    this.state = {
      mealsCategories: [],
    };
  }

  componentDidMount() {
    const { dispatchFoodRecipes, currentCategoryFood } = this.props;
    if (currentCategoryFood === 'all') {
      dispatchFoodRecipes({});
    } else {
      const ingredientsObj = {
        searchInput: currentCategoryFood,
        searchRadio: 'i',
      };
      dispatchFoodRecipes(ingredientsObj);
    }
    this.handleCategories();
  }

  async handleCategories() {
    const { meals } = await getAllFoodCategories();
    this.setState({
      mealsCategories: Object.values(meals),
    });
  }

  handleRecipes() {
    const { meals, isFetching } = this.props;
    if (!meals.length && !isFetching) return this.renderAlertError();
    return this.renderRecipes();
  }

  redirectToRecipeDetail() {
    const { meals } = this.props;
    return <Redirect to={ `/comidas/:${meals[0].idMeal}` } />;
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
    const { dispatchFoodRecipes } = this.props;
    const { mealsCategories } = this.state;
    const MAX_LENGTH = 5;
    const INITIAL_LENGTH = 0;
    if (mealsCategories !== undefined) {
      return (
        <div>
          <button
            data-testid="All-category-filter"
            type="button"
            onClick={ () => dispatchFoodRecipes({}) }
          >
            All
          </button>
          { mealsCategories.slice(INITIAL_LENGTH, MAX_LENGTH)
            .map((category, index) => (
              <CustomCartegory
                key={ index }
                index={ index }
                category={ category }
                title="Comidas"
              />))}
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
  currentCategoryFood: state.foodRecipesReducer.currentCategoryFood,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchFoodRecipes: (searchHeader) => dispatch(getFoodRecipes(searchHeader)),
  dispatchAllCategories: (allCategories) => {
    dispatch(allCategoriesFoodsAction(allCategories));
  },
  dispatchInitialCards: (JSONRequestAllCAtegories) => {
    dispatch(listFoodRecipes(JSONRequestAllCAtegories));
  },
  dispatchUpdateFoodIsFetching: () => dispatch(updateFoodIsFetching()),
});
Foods.propTypes = {
  dispatchFoodRecipes: PropTypes.func.isRequired,
  currentCategoryFood: PropTypes.string.isRequired,
  dispatchUpdateFoodIsFetching: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  meals: PropTypes.shape({
    length: PropTypes.number.isRequired,
    slice: PropTypes.func.isRequired,
  }).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Foods);
