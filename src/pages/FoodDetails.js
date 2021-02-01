import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDetails, fetchRecipes } from '../actions';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Loading from '../components/Loading';
import '../css/details.css';

class FoodDetails extends Component {
  constructor(props) {
    super(props);

    this.handleState = this.handleState.bind(this);

    this.state = {
      meal: [],
      ingredients: [],
      hashYoutube: '',
      request: true,
    };
  }

  componentDidMount() {
    const { requestRecipes, requestRecomendations } = this.props;
    requestRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    requestRecomendations('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  }

  componentDidUpdate() {
    const { mealsRecipes } = this.props;
    const { request } = this.state;
    // console.log(mealsRecipes);

    if (mealsRecipes.meals && request) {
      this.handleState();
    }
  }

  handleState() {
    const { match: { params: { id } }, mealsRecipes } = this.props;
    const filterRecipe = mealsRecipes.meals.find((recipe) => recipe.idMeal === id);
    const ingredients = Object.entries(filterRecipe)
      .filter((array) => array[0].includes('strIngredient') && array[1] !== '')
      .map((array2) => array2[1]);

    this.setState({
      meal: filterRecipe,
      ingredients,
      hashYoutube: filterRecipe.strYoutube.split('=')[1],
      request: false,
    });
  }

  render() {
    const { match: { params: { id } }, recomendations, history } = this.props;
    const { meal, hashYoutube, ingredients } = this.state;
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
            <h1 data-testid="recipe-title">{strMeal }</h1>
            <div className="images-container">
              <img
                src={ shareIcon }
                alt="shareIcon"
                data-testid="share-btn"
              />
              <img
                src={ whiteHeartIcon }
                alt="whiteHeartIcon"
                data-testid="favorite-btn"
              />
            </div>
          </div>
          <h3 data-testid="recipe-category">{strCategory}</h3>
        </div>
        <div className="ingredients-container">
          <h1>Ingredientes</h1>
          <ul className="list-container">
            {ingredients
              .map((ingredient, index) => (
                <li
                  key={ index }
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
        <div>
          <h1>Vídeo</h1>
          <iframe
            title="video"
            width="100%"
            height="315"
            src={ `https://www.youtube.com/embed/${hashYoutube}` }
            // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            // frameborder="0"
            // allowfullscreen
            data-testid="video"
          />
        </div>
        <div className="recomendations-container">
          <h1>Recomendadas</h1>
          <div className="div-recomendations">
            {
              recomendations.drinks
                .filter((_drink, index) => index < DRINK_LENGTH)
                .map((drink, index) => (
                  <div
                    key={ drink.strDrink }
                    className="div-recomendations-children"
                    data-testid={ `${index}-recomendation-card` }
                  >
                    <img src={ drink.strDrinkThumb } alt={ drink.strDrink } />
                    <h6 key={ drink.strCategory }>{ drink.strCategory }</h6>
                    <h4 key={ drink.strDrink }>{ drink.strDrink }</h4>
                  </div>
                ))
            }
          </div>
        </div>
        <button
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`/comidas/${id}/in-progress`) }
        >
          Iniciar Receita
        </button>
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
