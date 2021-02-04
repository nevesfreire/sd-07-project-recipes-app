import React from 'react';
import PropTypes from 'prop-types';
import { apiTheCocktailDB, apiTheMealDB } from '../services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import copy from '../helper/Require';

class ReceitaBebida extends React.Component {
  constructor() {
    super();

    this.state = {
      recipe: '',
      mealList: [],
      copied: false,
    };

    this.callRecipeAPI = this.callRecipeAPI.bind(this);
    this.ingredientListHandle = this.ingredientListHandle.bind(this);
  }

  componentDidMount() {
    this.callRecipeAPI();
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

  // startRecipeButton() {
  //   const { history } = this.props;
  //   const id = window.location.pathname.split('/').pop();
  //   history.push(`/comidas/${id}/in-progress`);
  // }

  render() {
    const { history } = this.props;
    const { recipe, copied, mealList } = this.state;
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
        <button type="button" data-testid="favorite-btn">
          <img src={ whiteHeartIcon } alt="Favorite" />
        </button>
        <p data-testid="0-recomendation-card">Recomendadas</p>
        <button
          style={ { position: 'fixed', bottom: 0 } }
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`/bebidas/${recipe.idDrink}/in-progress`) }
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
};

export default ReceitaBebida;
