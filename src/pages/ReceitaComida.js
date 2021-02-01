import React from 'react';
import apiTheMealDB from '../services/apiTheMealDB';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class ReceitaComida extends React.Component {
  constructor() {
    super();

    this.state = {
      recipe: '',
    };

    this.callRecipeAPI = this.callRecipeAPI.bind(this);
  }

  componentDidMount() {
    this.callRecipeAPI();
  }

  async callRecipeAPI() {
    // referência proxima linha: https://stackoverflow.com/questions/4758103/last-segment-of-url-in-jquery
    const urlParams = window.location.pathname.split('/').pop();
    const recipe = await apiTheMealDB(`lookup.php?i=${urlParams}`);
    this.setState({ recipe: recipe.meals[0] });
  }

  render() {
    const { recipe } = this.state;
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
        <p data-testid="instructions">{ recipe.strInstructions}</p>
        <button type="button" data-testid="share-btn">
          <img src={ shareIcon } alt="Share" />
        </button>
        <button type="button" data-testid="favorite-btn">
          <img src={ whiteHeartIcon } alt="Favorite" />
        </button>
        <iframe
          title="youtube"
          width="200"
          height="200"
          src={ recipe.strYoutube }
          data-testid="instructions"
        />
        <p data-testid="{index}-recomendation-card">Recomendadas</p>
        <button
          type="button"
          data-testid="start-recipe-btn"
        >
          Iniciar receita
        </button>
      </div>
    );
  }
}

export default ReceitaComida;
