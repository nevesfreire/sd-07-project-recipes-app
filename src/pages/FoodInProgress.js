import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecipes, copyButton } from '../actions';
import TitleBar from '../components/TitleBar';
import Loading from '../components/Loading';
import { favoriteMealLocalStorage } from '../localStorage/favoriteRecipes';
import { doneMealLocalStorage } from '../localStorage/doneRecipes';
import { handleCopy } from '../functions';
import {
  checkProgressFoodLocalStorage,
  setIngredientFoodLocalStorage,
  checkedFoodIngredients } from '../localStorage/inProgressRecipes';

class FoodInProgress extends Component {
  constructor(props) {
    super(props);
    this.handleState = this.handleState.bind(this);
    this.handleButtonEnabled = this.handleButtonEnabled.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.changeFavorite = this.changeFavorite.bind(this);
    this.createFavoriteLocalStorage = this.createFavoriteLocalStorage.bind(
      this,
    );
    this.changeDone = this.changeDone.bind(this);
    this.state = {
      meal: [],
      ingredients: [],
      measurement: [],
      request: true,
      favorite: false,
      done: false,
      button: true,
    };
  }

  componentDidMount() {
    const { requestRecipes, match: { params: { id } } } = this.props;
    requestRecipes(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    this.createFavoriteLocalStorage('favoriteRecipes');
    this.createFavoriteLocalStorage('doneRecipes');
    checkProgressFoodLocalStorage(id);
  }

  componentDidUpdate() {
    const { mealsRecipes } = this.props;
    const { request } = this.state;
    if (mealsRecipes.meals && request) this.handleState();
  }

  handleState() {
    const { match: { params: { id } }, mealsRecipes } = this.props;
    const filterRecipe = mealsRecipes.meals.find(
      (recipe) => recipe.idMeal === id,
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
      meal: filterRecipe,
      ingredients,
      measurement,
      request: false,
    });
  }

  handleButtonEnabled() {
    const doneIngredients = document.querySelectorAll('input:checked');
    const allIngredients = document.getElementsByClassName('form-check-input');
    if (doneIngredients.length === allIngredients.length) {
      this.setState({
        button: false,
      });
    } else {
      this.setState({
        button: true,
      });
    }
  }

  handleCheckbox({ target: { id: ingredient } }) {
    const { match: { params: { id } } } = this.props;
    setIngredientFoodLocalStorage(id, ingredient);
    this.handleButtonEnabled();
  }

  changeFavorite() {
    this.setState(
      (prevState) => ({
        favorite: !prevState.favorite,
      }),
      () => {
        const { meal, favorite } = this.state;
        favoriteMealLocalStorage(meal, favorite, 'favoriteRecipes');
      },
    );
  }

  changeDone() {
    this.setState(
      (prevState) => ({
        done: !prevState.done,
      }),
      () => {
        const { history } = this.props;
        const { meal, done } = this.state;
        doneMealLocalStorage(meal, done, 'doneRecipes');
        history.push('/receitas-feitas');
      },
    );
  }

  createFavoriteLocalStorage(keyStorage) {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const read = JSON.parse(localStorage.getItem(keyStorage));

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
    const { executeCopy, valueCopied, match: { params: { id } } } = this.props;
    const { meal, ingredients, favorite, measurement, button } = this.state;
    const { strMealThumb, strMeal, strCategory, strInstructions } = meal;
    if (!strMealThumb) return <Loading />;
    return (
      <div className="main-container">
        <img
          src={ strMealThumb }
          alt={ strMeal }
          data-testid="recipe-photo"
          className="main-image"
        />
        <TitleBar
          strRecipe={ strMeal }
          strCategory={ strCategory }
          handleCopy={ handleCopy }
          executeCopy={ executeCopy }
          changeFavorite={ this.changeFavorite }
          valueCopied={ valueCopied }
          favorite={ favorite }
        />
        <div className="ingredients-container">
          <h1>Ingredientes</h1>
          <div className="list-container">
            {ingredients.map((ingredient, index) => (
              <div
                className="form-check"
                data-testid={ `${index}-ingredient-step` }
                key={ ingredient }
              >
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={ ingredient }
                  onChange={ this.handleCheckbox }
                  checked={ checkedFoodIngredients(id, ingredient) }
                />
                <label className="form-check-label" htmlFor={ ingredient }>
                  {`${ingredient} - ${measurement[index]}`}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="instructions-container">
          <h1>Instruções</h1>
          <p data-testid="instructions">{strInstructions}</p>
        </div>
        <div className="finish-button-container">
          <button
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ this.changeDone }
            className="finish-button-recipe"
            disabled={ button }
          >
            Finalizar Receita
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ recipesReducer, recomendationsReducer }) => ({
  mealsRecipes: recipesReducer.recipes,
  valueCopied: recomendationsReducer.copy,
});

const mapDispatchToProps = (dispatch) => ({
  requestRecipes: (endpoint) => dispatch(fetchRecipes(endpoint)),
  executeCopy: (value) => dispatch(copyButton(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodInProgress);

FoodInProgress.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  mealsRecipes: PropTypes.shape({
    meals: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  requestRecipes: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  executeCopy: PropTypes.func.isRequired,
  valueCopied: PropTypes.string.isRequired,
};
