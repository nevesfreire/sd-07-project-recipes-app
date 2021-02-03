import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { apiTheMealDB, apiTheCocktailDB } from '../services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { startRecipe } from '../redux/actions';

class ReceitaComida extends React.Component {
  constructor() {
    super();

    this.state = {
      recipe: '',
      drinkList: [],
    };

    this.callRecipeAPI = this.callRecipeAPI.bind(this);
    // this.ingredientListHandle = this.ingredientListHandle.bind(this);
  }

  componentDidMount() {
    this.callRecipeAPI();
  }

  async callRecipeAPI() {
    // referência proxima linha: https://stackoverflow.com/questions/4758103/
    const urlParams = window.location.pathname.split('/').pop();
    const recipe = await apiTheMealDB(`lookup.php?i=${urlParams}`);
    const drinkList = await apiTheCocktailDB('search.php?s=');
    this.setState({
      recipe: recipe.meals[0],
      drinkList: drinkList.drinks,
    });
  }

  // ingredientListHandle() {
  //   const { recipe } = this.state;
  //   const recipeArray = [{ ...recipe }];
  //   const test = recipeArray
  //     .map((e) => e.strIngredient1);
  //   console.log(test);
  // }

  async startRecipeButton() {
    const { recipe } = this.state;
    const { startRecipeDispatch, history } = this.props;
    localStorage.setItem('inProgressRecipe', JSON.stringify(recipe));
    await startRecipeDispatch(recipe);
    history.push(`/comidas/${recipe.idMeal}/in-progress`);
  }

  render() {
    const { recipe, drinkList } = this.state;
    if (recipe === '') {
      return <p>Loading...</p>;
    }
    console.log(drinkList);
    // this.ingredientListHandle();

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
        <ul>
          <li data-testid="0-ingredient-name-and-measure">
            {`${recipe.strIngredient1} - ${recipe.strMeasure1}`}
          </li>
          <li data-testid="1-ingredient-name-and-measure">
            {`${recipe.strIngredient2} - ${recipe.strMeasure2}`}
          </li>
        </ul>
        <p data-testid="instructions">{ recipe.strInstructions}</p>
        <button type="button" data-testid="share-btn">
          <img src={ shareIcon } alt="Share" />
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          <img src={ whiteHeartIcon } alt="Favorite" />
        </button>
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
        <p data-testid="0-recomendation-card">Recomendadas</p>
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
