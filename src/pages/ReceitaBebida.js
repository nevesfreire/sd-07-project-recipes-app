import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Carousel } from 'react-bootstrap';
import { apiTheCocktailDB, apiTheMealDB } from '../services';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import { startRecipeDrink } from '../redux/actions';

class ReceitaBebida extends React.Component {
  constructor() {
    super();

    this.state = {
      recipe: '',
      mealList: [],
      storageObj: {},
    };

    this.callRecipeAPI = this.callRecipeAPI.bind(this);
    this.ingredientListHandle = this.ingredientListHandle.bind(this);
  }

  componentDidMount() {
    this.callRecipeAPI();
    if (JSON.parse(localStorage.getItem('favoriteRecipes')) === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }

  async startRecipeButton() {
    const { recipe } = this.state;
    const { startRecipeDrinkDispatch, history } = this.props;
    localStorage.setItem('inProgressDrinkRecipe', JSON.stringify(recipe));
    await startRecipeDrinkDispatch(recipe);
    history.push(`/bebidas/${recipe.idDrink}/in-progress`);
  }

  async callRecipeAPI() {
    // referência proxima linha: https://stackoverflow.com/questions/4758103/
    const urlParams = window.location.pathname.split('/').pop();
    const recipe = await apiTheCocktailDB(`lookup.php?i=${urlParams}`);
    // const arrayTags = recipe.drinks[0].strTags === null ? []
    //   : recipe.drinks[0].strTags.split(',');
    const storageObj = {
      id: recipe.drinks[0].idDrink,
      type: 'bebida',
      area: '',
      category: recipe.drinks[0].strCategory,
      alcoholicOrNot: recipe.drinks[0].strAlcoholic,
      name: recipe.drinks[0].strDrink,
      image: recipe.drinks[0].strDrinkThumb,
      // doneDate: recipe.drinks[0].dateModified,
      // tags: arrayTags,
    };
    const mealList = await apiTheMealDB('search.php?s=');
    this.setState({
      recipe: recipe.drinks[0],
      mealList: mealList.meals,
      storageObj,
    });
  }

  ingredientListHandle() {
    const { recipe } = this.state;
    const array = [];
    const sixteen = 16;
    for (let index = 1; index < sixteen; index += 1) {
      const strIngredient = `strIngredient${[index]}`;
      const strMeasure = `strMeasure${[index]}`;
      if (recipe[strIngredient] !== null && recipe[strIngredient] !== '') {
        array.push(`${recipe[strIngredient]} - ${recipe[strMeasure]}`);
      }
    }
    return array;
  }

  render() {
    const { recipe, mealList, storageObj } = this.state;
    const SIX = 6;
    const ingredientsArray = this.ingredientListHandle();
    const url = window.location.pathname;
    if (recipe === '') {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <h1>Receita de Bebida</h1>
        <img
          style={ { width: 100 } }
          src={ recipe.strDrinkThumb }
          alt={ recipe.strDrinkThumb }
          data-testid="recipe-photo"
        />
        <h4 data-testid="recipe-title">{ recipe.strDrink }</h4>
        <p data-testid="recipe-category">{ recipe.strAlcoholic }</p>
        <ul>
          { ingredientsArray.map((e, index) => (
            <li key={ e } data-testid={ `${[index]}-ingredient-name-and-measure` }>
              {e}
            </li>
          )) }
        </ul>
        <p data-testid="instructions">{ recipe.strInstructions}</p>
        <ShareButton url={ url } />
        <FavoriteButton storageObj={ storageObj } />
        <p>Recomendadas</p>
        <Carousel style={ { height: '30%' } }>
          { mealList.map((item, index) => (
            index < SIX
              ? (
                <Carousel.Item
                  key={ item.idMeal }
                  data-testid={ `${index}-recomendation-card` }
                >
                  <img
                    src={ item.strMealThumb }
                    alt={ item.strMealThumb }
                    style={ { width: '30%' } }
                  />
                  <Carousel.Caption>
                    <p>{item.strCategory}</p>
                    <h5 data-testid={ `${index}-recomendation-title` }>{item.strMeal}</h5>
                  </Carousel.Caption>
                </Carousel.Item>
              )
              : null
          ))}
        </Carousel>
        <button
          style={ { position: 'fixed', bottom: 0 } }
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => this.startRecipeButton() }
        >
          Iniciar receita
        </button>
      </div>
    );
  }
}

ReceitaBebida.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  startRecipeDrinkDispatch: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  startRecipeDrinkDispatch: (e) => dispatch(startRecipeDrink(e)),
});

export default connect(null, mapDispatchToProps)(ReceitaBebida);
