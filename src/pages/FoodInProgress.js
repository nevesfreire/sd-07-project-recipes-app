import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDetails, fetchRecipes } from '../actions';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Loading from '../components/Loading';
import readFavoriteLocalStorage from '../localStorage';
// import '../css/details.css';

class FoodDetails extends Component {
  constructor(props) {
    super(props);

    this.handleState = this.handleState.bind(this);
    this.changeFavorite = this.changeFavorite.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.createFavoriteLocalStorage = this.createFavoriteLocalStorage.bind(this);

    this.state = {
      meal: [],
      ingredients: [],
      measurement: [],
      request: true,
      favorite: false,
    };
  }

  componentDidMount() {
    const { requestRecipes,
      requestRecomendations, match: { params: { id } } } = this.props;
    requestRecipes(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    requestRecomendations('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    this.createFavoriteLocalStorage();
  }

  componentDidUpdate() {
    const { mealsRecipes } = this.props;
    const { request } = this.state;

    if (mealsRecipes.meals && request) {
      this.handleState();
    }
  }

  handleState() {
    const { match: { params: { id } }, mealsRecipes } = this.props;
    const filterRecipe = mealsRecipes.meals.find((recipe) => recipe.idMeal === id);
    const ingredients = Object.entries(filterRecipe)
      .filter((array) => array[0]
        .includes('strIngredient') && array[1] !== null && array[1] !== '')
      .map((array2) => array2[1]);

    const measurement = Object.entries(filterRecipe)
      .filter((array) => array[0]
        .includes('strMeasure') && array[1] !== null && array[1] !== '')
      .map((array2) => array2[1]);

    this.setState({
      meal: filterRecipe,
      ingredients,
      measurement,
      request: false,
    });
  }

  handleCheckbox({ target }) {
    console.log(target);
  }

  changeFavorite() {
    this.setState((prevState) => ({
      favorite: !prevState.favorite,
    }),
    () => {
      const { meal, favorite } = this.state;
      readFavoriteLocalStorage(meal, favorite);
    });
  }

  createFavoriteLocalStorage() {
    const { match: { params: { id } } } = this.props;
    const read = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (read && read.some((obj) => obj.idMeal === id)) {
      this.setState({
        favorite: true,
      });
    } else if (!read) {
      this.setState({
        favorite: false,
      },
      () => localStorage.setItem('favoriteRecipes', JSON.stringify([])));
    }
  }

  render() {
    const { recomendations, history } = this.props;
    const { meal, ingredients, favorite, measurement } = this.state;
    const { strMealThumb, strMeal, strCategory, strInstructions } = meal;
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
            <h1 data-testid="recipe-title">{strMeal }</h1>
            <h3 data-testid="recipe-category">{strCategory}</h3>
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
                  key={ ingredient }
                >
                  <input
                    type="checkbox"
                    data-testid={ `${index}-ingredient-step` }
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

const mapStateToProps = ({ recipesReducer, recomendationsReducer }) => ({
  mealsRecipes: recipesReducer.recipes,
  recomendations: recomendationsReducer.recomendations,
});

const mapDispatchToProps = (dispatch) => ({
  requestRecomendations: (endpoint) => dispatch(fetchDetails(endpoint)),
  requestRecipes: (endpoint) => dispatch(fetchRecipes(endpoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetails);

FoodDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
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
};
