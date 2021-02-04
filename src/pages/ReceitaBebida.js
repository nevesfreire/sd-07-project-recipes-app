import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { apiTheCocktailDB, apiTheMealDB } from '../services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { startRecipeDrink } from '../redux/actions';

class ReceitaBebida extends React.Component {
  constructor() {
    super();

    this.state = {
      recipe: '',
      mealList: [],
    };

    this.callRecipeAPI = this.callRecipeAPI.bind(this);
  }

  componentDidMount() {
    this.callRecipeAPI();
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

  // startRecipeButton() {
  //   const { history } = this.props;
  //   const id = window.location.pathname.split('/').pop();
  //   history.push(`/comidas/${id}/in-progress`);
  // }

  render() {
    const { recipe, mealList } = this.state;
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
        <button type="button" data-testid="favorite-btn">
          <img src={ whiteHeartIcon } alt="Favorite" />
        </button>
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

ReceitaBebida.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  startRecipeDrinkDispatch: (e) => dispatch(startRecipeDrink(e)),
});

export default connect(null, mapDispatchToProps)(ReceitaBebida);
