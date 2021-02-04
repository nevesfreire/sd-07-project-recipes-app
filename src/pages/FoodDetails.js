import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDetails, fetchRecipes, copyButton } from '../actions';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Loading from '../components/Loading';
import { favoriteMealLocalStorage } from '../localStorage/favoriteRecipes';
import '../css/details.css';

class FoodDetails extends Component {
  constructor(props) {
    super(props);

    this.handleState = this.handleState.bind(this);
    this.changeFavorite = this.changeFavorite.bind(this);
    this.createFavoriteLocalStorage = this.createFavoriteLocalStorage.bind(
      this,
    );
    this.handleCopy = this.handleCopy.bind(this);
    this.showButton = this.showButton.bind(this);

    this.state = {
      meal: [],
      ingredients: [],
      measurement: [],
      hashYoutube: '',
      request: true,
      favorite: false,
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
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
    requestRecomendations(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    );
    this.createFavoriteLocalStorage('favoriteRecipes');
    this.createFavoriteLocalStorage('doneRecipes');
  }

  componentDidUpdate() {
    const { mealsRecipes } = this.props;
    const { request } = this.state;

    if (mealsRecipes.meals && request) {
      this.handleState();
    }
  }

  handleState() {
    const {
      match: {
        params: { id },
      },
      mealsRecipes,
    } = this.props;
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
      hashYoutube: filterRecipe.strYoutube.split('=')[1],
      request: false,
    });
  }

  handleCopy() {
    const {
      executeCopy,
      location: { pathname },
    } = this.props;
    const copy = require('clipboard-copy');
    copy(`http://localhost:3000${pathname}`);
    executeCopy('Link copiado!');
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

  showButton() {
    const {
      match: {
        params: { id },
      },
      history,
    } = this.props;
    const getDoneStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!getDoneStorage.length) {
      return (
        <button
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`/comidas/${id}/in-progress`) }
          className="finish-button-recipe"
        >
          Iniciar Receita
        </button>
      );
    }
  }

  render() {
    const { recomendations, valueCopied } = this.props;
    const {
      meal,
      hashYoutube,
      ingredients,
      favorite,
      measurement,
    } = this.state;
    const { strMealThumb, strMeal, strCategory, strInstructions } = meal;
    const DRINK_LENGTH = 6;
    // console.log(recomendations);
    if (!recomendations.drinks) return <Loading />;
    return (
      <div className="main-container">
        <img
          src={ strMealThumb }
          alt={ strMeal }
          data-testid="recipe-photo"
          className="main-image"
        />
        <div className="title-container">
          <div className="title-subcontainer">
            <h1 data-testid="recipe-title">{strMeal}</h1>
            <h3 data-testid="recipe-category">{strCategory}</h3>
          </div>
          <div className="images-container">
            <p>{valueCopied}</p>
            <button type="button" onClick={ this.handleCopy }>
              <img data-testid="share-btn" src={ shareIcon } alt="shareIcon" />
            </button>
            <button type="button" onClick={ this.changeFavorite }>
              <img
                data-testid="favorite-btn"
                src={ favorite ? blackHeartIcon : whiteHeartIcon }
                alt="whiteHeartIcon"
              />
            </button>
          </div>
        </div>
        <div className="ingredients-container">
          <h1>Ingredientes</h1>
          <ul className="list-container">
            {ingredients.map((ingredient, index) => (
              <li
                key={ index }
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
        <div>
          <h1>Vídeo</h1>
          <iframe
            title="video"
            width="100%"
            height="315"
            src={ `https://www.youtube.com/embed/${hashYoutube}` }
            data-testid="video"
          />
        </div>
        <div className="recomendations-container">
          <h1>Recomendadas</h1>
          <div className="div-recomendations">
            {recomendations.drinks
              .filter((_drink, index) => index < DRINK_LENGTH)
              .map((drink, index) => (
                <div
                  key={ drink.strDrink }
                  className="div-recomendations-children"
                  data-testid={ `${index}-recomendation-card` }
                >
                  <img src={ drink.strDrinkThumb } alt={ drink.strDrink } />
                  <h6 key={ drink.strCategory }>{drink.strCategory}</h6>
                  <h4
                    key={ drink.strDrink }
                    data-testid={ `${index}-recomendation-title` }
                  >
                    {drink.strDrink}
                  </h4>
                </div>
              ))}
          </div>
        </div>
        <div className="finish-button-container">{this.showButton()}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ recipesReducer, recomendationsReducer }) => ({
  mealsRecipes: recipesReducer.recipes,
  recomendations: recomendationsReducer.recomendations,
  valueCopied: recomendationsReducer.copy,
});

const mapDispatchToProps = (dispatch) => ({
  requestRecomendations: (endpoint) => dispatch(fetchDetails(endpoint)),
  requestRecipes: (endpoint) => dispatch(fetchRecipes(endpoint)),
  executeCopy: (value) => dispatch(copyButton(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetails);

FoodDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  recomendations: PropTypes.shape({
    drinks: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  mealsRecipes: PropTypes.shape({
    meals: PropTypes.arrayOf(PropTypes.object),
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
