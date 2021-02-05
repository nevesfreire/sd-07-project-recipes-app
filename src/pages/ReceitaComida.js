import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Carousel } from 'react-bootstrap';
import { apiTheCocktailDB, apiTheMealDB } from '../services';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import { startRecipe } from '../redux/actions';

class ReceitaComida extends React.Component {
  constructor() {
    super();

    this.state = {
      recipe: '',
      drinkList: [],
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

  async callRecipeAPI() {
    // referência proxima linha: https://stackoverflow.com/questions/4758103/
    const urlParams = window.location.pathname.split('/').pop();
    const recipe = await apiTheMealDB(`lookup.php?i=${urlParams}`);
    // const arrayTags = recipe.meals[0].strTags === null
    //   ? [] : recipe.meals[0].strTags.split(',');
    const storageObj = {
      id: recipe.meals[0].idMeal,
      type: 'comida',
      area: recipe.meals[0].strArea,
      category: recipe.meals[0].strCategory,
      alcoholicOrNot: '',
      name: recipe.meals[0].strMeal,
      image: recipe.meals[0].strMealThumb,
      // doneDate: recipe.meals[0].dateModified,
      // tags: arrayTags,
    };
    const drinkList = await apiTheCocktailDB('search.php?s=');
    this.setState({
      recipe: recipe.meals[0],
      drinkList: drinkList.drinks,
      storageObj,
    });
  }

  ingredientListHandle() {
    const { recipe } = this.state;
    const array = [];
    const twentyOne = 21;
    for (let index = 1; index < twentyOne; index += 1) {
      const strIngredient = `strIngredient${[index]}`;
      const strMeasure = `strMeasure${[index]}`;
      if (recipe[strIngredient] !== null && recipe[strIngredient] !== '') {
        array.push(`${recipe[strIngredient]} - ${recipe[strMeasure]}`);
      }
    }
    return array;
  }

  async startRecipeButton() {
    const { recipe } = this.state;
    const { startRecipeDispatch, history } = this.props;
    localStorage.setItem('inProgressRecipe', JSON.stringify(recipe));
    await startRecipeDispatch(recipe);
    history.push(`/comidas/${recipe.idMeal}/in-progress`);
  }

  render() {
    const { recipe, drinkList, storageObj } = this.state;
    const SIX = 6;
    const ingredientsArray = this.ingredientListHandle();
    const url = window.location.pathname;
    if (recipe === '') {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <h1>Receita de Comida</h1>
        <img
          style={ { width: 100 } }
          src={ recipe.strMealThumb }
          alt={ recipe.strMealThumb }
          data-testid="recipe-photo"
        />
        <h4 data-testid="recipe-title">{ recipe.strMeal }</h4>
        <p data-testid="recipe-category">{ recipe.strCategory }</p>
        <p>Ingredientes</p>
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
        <iframe
          title="youtube"
          width="360"
          height="360"
          frameBorder="0"
          allowFullScreen
          // referência proxima linha: https://stackoverflow.com/questions/20498831/
          src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
          data-testid="video"
        />
        <p>Recomendadas</p>
        <Carousel style={ { height: '30%' } }>
          { drinkList.map((item, index) => (
            index < SIX
              ? (
                <Carousel.Item
                  key={ item.idDrink }
                  data-testid={ `${index}-recomendation-card` }
                >
                  <img
                    src={ item.strDrinkThumb }
                    alt={ item.strDrinkThumb }
                    style={ { width: '30%' } }
                  />
                  <Carousel.Caption>
                    <p>{item.strAlcoholic}</p>
                    <h5
                      data-testid={ `${index}-recomendation-title` }
                    >
                      {item.strDrink}
                    </h5>
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

ReceitaComida.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  startRecipeDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  startRecipeDispatch: (e) => dispatch(startRecipe(e)),
});

export default connect(null, mapDispatchToProps)(ReceitaComida);
