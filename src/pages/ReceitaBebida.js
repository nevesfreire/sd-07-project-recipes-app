import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Carousel } from 'react-bootstrap';
import { apiTheCocktailDB, apiTheMealDB } from '../services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import copy from '../helper/Require';
import { startRecipeDrink } from '../redux/actions';

class ReceitaBebida extends React.Component {
  constructor() {
    super();

    this.state = {
      recipe: '',
      mealList: [],
      copied: false,
      favorite: false,
    };

    this.callRecipeAPI = this.callRecipeAPI.bind(this);
    this.ingredientListHandle = this.ingredientListHandle.bind(this);
    this.favoriteButtonHandle = this.favoriteButtonHandle.bind(this);
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
    const mealList = await apiTheMealDB('search.php?s=');
    this.setState({
      recipe: recipe.drinks[0],
      mealList: mealList.meals,
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

  favoriteButtonHandle() {
    const { favorite, recipe } = this.state;
    this.setState({ favorite: !favorite });
    const favRecipeStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    localStorage.setItem(
      'favoriteRecipes', JSON.stringify([...favRecipeStorage, recipe]),
    );
  }

  render() {
    const { recipe, copied, mealList, favorite } = this.state;
    const SIX = 6;
    const ingredientsArray = this.ingredientListHandle();
    if (recipe === '') {
      return <p>Loading...</p>;
    }
    console.log(mealList);

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
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => {
            this.setState({ copied: !copied });
            copy(`http://localhost:3000/bebidas/${recipe.idDrink}`);
          } }
        >
          <img src={ shareIcon } alt="Share" />
        </button>
        {copied ? <span style={ { color: 'red' } }>Link copiado!</span> : null}
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ this.favoriteButtonHandle }
          src={ !favorite ? whiteHeartIcon : blackHeartIcon }
        >
          {
            !favorite
              ? <img src={ whiteHeartIcon } alt="Favorite" />
              : <img src={ blackHeartIcon } alt="Favorite" />
          }
        </button>
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
