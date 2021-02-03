import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecipes } from '../actions';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Loading from '../components/Loading';
import { favoriteDrinkLocalStorage } from '../localStorage/favoriteRecipes';
import { doneDrinkLocalStorage } from '../localStorage/doneRecipes';
import '../css/details.css';

class DrinkInProgress extends Component {
  constructor(props) {
    super(props);

    this.handleState = this.handleState.bind(this);
    this.changeFavorite = this.changeFavorite.bind(this);
    this.createFavoriteLocalStorage = this.createFavoriteLocalStorage.bind(this);

    this.state = {
      drinks: [],
      ingredients: [],
      measurement: [],
      request: true,
      favorite: false,
    };
  }

  componentDidMount() {
    const { requestRecipes,
      match: { params: { id } } } = this.props;
    requestRecipes(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
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
    const filterRecipe = drinksRecipes.drinks.find((recipe) => recipe.idDrink === id);
    const ingredients = Object.entries(filterRecipe)
      .filter((array) => array[0]
        .includes('strIngredient') && array[1] !== null && array[1] !== '')
      .map((array2) => array2[1]);

    const measurement = Object.entries(filterRecipe)
      .filter((array) => array[0]
        .includes('strMeasure') && array[1] !== null && array[1] !== '')
      .map((array2) => array2[1]);

    this.setState({
      drinks: filterRecipe,
      ingredients,
      measurement,
      request: false,
    });
  }

  changeFavorite() {
    this.setState((prevState) => ({
      favorite: !prevState.favorite,
    }),
    () => {
      const { drinks, favorite } = this.state;
      favoriteDrinkLocalStorage(drinks, favorite, 'favoriteRecipes');
      doneDrinkLocalStorage(drinks, favorite, 'doneRecipes');
    });
  }

  createFavoriteLocalStorage(keyStorage) {
    const { match: { params: { id } } } = this.props;
    const read = JSON.parse(localStorage.getItem(keyStorage));

    if (read && read.some((obj) => obj.id === id)) {
      this.setState({
        favorite: true,
      });
    } else if (!read) {
      this.setState({
        favorite: false,
      },
      () => localStorage.setItem(keyStorage, JSON.stringify([])));
    }
  }

  render() {
    const { history } = this.props;
    const { drinks, ingredients, favorite, measurement } = this.state;
    const { strDrinkThumb, strDrink, strInstructions, strAlcoholic } = drinks;

    if (!strDrinkThumb) return <Loading />;
    return (
      <div className="main-container">
        <img
          src={ strDrinkThumb }
          alt={ strDrink }
          data-testid="recipe-photo"
          className="main-image"
        />
        <div className="title-container">
          <div className="title-subcontainer">
            <h1 data-testid="recipe-title">{strDrink}</h1>
            <h3 data-testid="recipe-category">{strAlcoholic}</h3>
          </div>
          <div className="images-container">
            <button
              type="button"
            >
              <img
                data-testid="share-btn"
                src={ shareIcon }
                alt="shareIcon"
              />
            </button>
            <button
              type="button"
              onClick={ this.changeFavorite }
            >
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
          <div className="list-container">
            {ingredients
              .map((ingredient, index) => (
                <div
                  className="form-check"
                  data-testid={ `${index}-ingredient-step` }
                  key={ ingredient }
                >
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={ ingredient }
                    onClick={ this.handleCheckbox }
                  />
                  <label
                    className="form-check-label"
                    htmlFor={ ingredient }
                  >
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
            onClick={ () => history.push('/receitas-feitas') }
            className="finish-button-recipe"
          >
            Finalizar Receita
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ recipesReducer }) => ({
  drinksRecipes: recipesReducer.recipes,
});

const mapDispatchToProps = (dispatch) => ({
  requestRecipes: (endpoint) => dispatch(fetchRecipes(endpoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrinkInProgress);

DrinkInProgress.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  drinksRecipes: PropTypes.shape({
    drinks: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  requestRecipes: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
