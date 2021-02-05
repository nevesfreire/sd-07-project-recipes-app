import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDetails, fetchRecipes, copyButton } from '../actions';
import TitleBar from '../components/TitleBar';
import Loading from '../components/Loading';
import { favoriteDrinkLocalStorage } from '../localStorage/favoriteRecipes';
import { handleCopy, showButton } from '../functions';
import '../css/details.css';

class DrinkDetails extends Component {
  constructor(props) {
    super(props);
    this.handleState = this.handleState.bind(this);
    this.changeFavorite = this.changeFavorite.bind(this);
    this.createFavoriteLocalStorage = this.createFavoriteLocalStorage.bind(
      this,
    );
    // const read = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // const { match: { params: { id } } } = this.props;
    this.state = {
      drinks: [],
      ingredients: [],
      measurement: [],
      request: true,
      favorite: false,
      // favorite: read && read.some((obj) => obj.id === id) ? true : false,
    };
  }

  componentDidMount() {
    const {
      requestRecipes,
      requestRecomendations,
      match: {
        params: { id },
      },
    } = this.props;
    requestRecipes(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
    requestRecomendations(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    );
    // console.log('chegou aqui Did Mount');
    this.createFavoriteLocalStorage('favoriteRecipes');
    this.createFavoriteLocalStorage('doneRecipes');
  }

  componentDidUpdate() {
    const { drinksRecipes } = this.props;
    const { request } = this.state;
    if (drinksRecipes.drinks && request) {
      this.handleState();
    }
  }

  handleState() {
    const { match: { params: { id } }, drinksRecipes } = this.props;
    const filterRecipe = drinksRecipes.drinks.find(
      (recipe) => recipe.idDrink === id,
    );
    const ingredients = Object.entries(filterRecipe)
      .filter(
        (array) => array[0].includes('strIngredient')
          && array[1] !== null
          && array[1] !== '',
      )
      .map((array2) => array2[1]);
    const measurement = Object.entries(filterRecipe)
      .filter(
        (array) => array[0].includes('strMeasure')
          && array[1] !== null
          && array[1] !== '',
      )
      .map((array2) => array2[1]);
    this.setState({
      drinks: filterRecipe,
      ingredients,
      measurement,
      request: false,
    });
  }

  changeFavorite() {
    this.setState(
      (prevState) => ({
        favorite: !prevState.favorite,
      }),
      () => {
        const { drinks, favorite } = this.state;
        favoriteDrinkLocalStorage(drinks, favorite, 'favoriteRecipes');
      },
    );
  }

  createFavoriteLocalStorage(keyStorage) {
    const { match: { params: { id } } } = this.props;
    const read = JSON.parse(localStorage.getItem(keyStorage));
    // console.log(read, id);
    if (read && read.some((obj) => obj.id === id)) {
      this.setState({
        favorite: true,
      });
    } else if (!read) {
      this.setState(
        {
          favorite: false,
        },
        () => localStorage.setItem(keyStorage, JSON.stringify([])),
      );
    }
  }

  render() {
    const { match: { params: { id } }, history,
      recomendations, valueCopied, executeCopy } = this.props;
    const { drinks, ingredients, favorite, measurement } = this.state;
    const { strDrinkThumb, strDrink, strInstructions, strAlcoholic } = drinks;
    const MEAL_LENGTH = 6;
    if (!recomendations.meals) return <Loading />;
    return (
      <div className="main-container">
        <img
          src={ strDrinkThumb }
          alt={ strDrink }
          data-testid="recipe-photo"
          className="main-image"
        />
        <TitleBar
          strRecipe={ strDrink }
          strCategory={ strAlcoholic }
          handleCopy={ handleCopy }
          executeCopy={ executeCopy }
          changeFavorite={ this.changeFavorite }
          valueCopied={ valueCopied }
          favorite={ favorite }
        />
        <div className="ingredients-container">
          <h1>Ingredientes</h1>
          <ul className="list-container">
            {ingredients.map((ingredient, index) => (
              <li
                key={ ingredient }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ingredient} - ${measurement[index]}`}
              </li>
            ))}
          </ul>
        </div>
        <div className="instructions-container">
          <h1>Instruções</h1>
          <p data-testid="instructions">{strInstructions}</p>
        </div>
        <div className="recomendations-container">
          <h1>Recomendadas</h1>
          <div className="div-recomendations">
            {recomendations.meals
              .filter((_meal, index) => index < MEAL_LENGTH)
              .map((meal, index) => (
                <div
                  key={ meal.strMeal }
                  className="div-recomendations-children"
                  data-testid={ `${index}-recomendation-card` }
                >
                  <img src={ meal.strMealThumb } alt={ meal.strMeal } />
                  <h6 key={ meal.strCategory }>{meal.strCategory}</h6>
                  <h4
                    key={ meal.strMeal }
                    data-testid={ `${index}-recomendation-title` }
                  >
                    {meal.strMeal}
                  </h4>
                </div>
              ))}
          </div>
        </div>
        <div className="finish-button-container">{ showButton(id, history) }</div>
      </div>
    );
  }
}

const mapStateToProps = ({ recipesReducer, recomendationsReducer }) => ({
  drinksRecipes: recipesReducer.recipes,
  recomendations: recomendationsReducer.recomendations,
  valueCopied: recomendationsReducer.copy,
});

const mapDispatchToProps = (dispatch) => ({
  requestRecomendations: (endpoint) => dispatch(fetchDetails(endpoint)),
  requestRecipes: (endpoint) => dispatch(fetchRecipes(endpoint)),
  executeCopy: (value) => dispatch(copyButton(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrinkDetails);

DrinkDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  recomendations: PropTypes.shape({
    meals: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  drinksRecipes: PropTypes.shape({
    drinks: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  requestRecomendations: PropTypes.func.isRequired,
  requestRecipes: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  executeCopy: PropTypes.func.isRequired,
  valueCopied: PropTypes.string.isRequired,
};
