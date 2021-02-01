import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDetails, fetchRecipes } from '../actions';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Loading from '../components/Loading';
import '../css/details.css';

class DrinkDetails extends Component {
  constructor(props) {
    super(props);

    this.handleState = this.handleState.bind(this);
    this.changeFavorite = this.changeFavorite.bind(this);

    this.state = {
      drinks: [],
      ingredients: [],
      request: true,
      favorite: false,
    };
  }

  componentDidMount() {
    const { requestRecipes, requestRecomendations } = this.props;
    requestRecipes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    requestRecomendations('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  }

  componentDidUpdate() {
    const { drinksRecipes } = this.props;
    const { request } = this.state;
    // console.log(drinksRecipes);

    if (drinksRecipes.drinks && request) {
      this.handleState();
    }
  }

  handleState() {
    const { match: { params: { id } }, drinksRecipes } = this.props;
    const filterRecipe = drinksRecipes.drinks.find((recipe) => recipe.idDrink === id);
    const ingredients = Object.entries(filterRecipe)
      .filter((array) => array[0].includes('strIngredient') && array[1] !== null)
      .map((array2) => array2[1]);

    this.setState({
      drinks: filterRecipe,
      ingredients,
      request: false,
    });
  }

  changeFavorite() {
    this.setState((prevState) => ({
      favorite: !prevState.favorite,
    }));
  }

  render() {
    const { match: { params: { id } }, recomendations, history } = this.props;
    const { drinks, ingredients, favorite } = this.state;
    const { strDrinkThumb, strDrink, strCategory, strInstructions } = drinks;
    const MEAL_LENGTH = 6;
    // console.log(recomendations);
    if (!recomendations.meals) return <Loading />;
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
            <h3 data-testid="recipe-category">{strCategory}</h3>
          </div>
          <div className="images-container">
            <button
              type="button"
              data-testid="share-btn"
            >
              <img
                src={ shareIcon }
                alt="shareIcon"
              />
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ this.changeFavorite }
            >
              <img
                src={ favorite ? blackHeartIcon : whiteHeartIcon }
                alt="whiteHeartIcon"
              />
            </button>
          </div>
        </div>
        <div className="ingredients-container">
          <h1>Ingredientes</h1>
          <ul className="list-container">
            {ingredients
              .map((ingredient, index) => (
                <li
                  key={ ingredient }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {ingredient}
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
            {
              recomendations.meals
                .filter((_meal, index) => index < MEAL_LENGTH)
                .map((meal, index) => (
                  <div
                    key={ meal.strMeal }
                    className="div-recomendations-children"
                    data-testid={ `${index}-recomendation-card` }
                  >
                    <img src={ meal.strMealThumb } alt={ meal.strMeal } />
                    <h6 key={ meal.strCategory }>{ meal.strCategory }</h6>
                    <h4 key={ meal.strMeal }>{ meal.strMeal }</h4>
                  </div>
                ))
            }
          </div>
        </div>
        <div className="finish-button-container">
          <button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => history.push(`/comidas/${id}/in-progress`) }
            className="finish-button-recipe"
          >
            Iniciar Receita
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ recipesReducer, recomendationsReducer }) => ({
  drinksRecipes: recipesReducer.recipes,
  recomendations: recomendationsReducer.recomendations,
});

const mapDispatchToProps = (dispatch) => ({
  requestRecomendations: (endpoint) => dispatch(fetchDetails(endpoint)),
  requestRecipes: (endpoint) => dispatch(fetchRecipes(endpoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrinkDetails);

DrinkDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
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
};
