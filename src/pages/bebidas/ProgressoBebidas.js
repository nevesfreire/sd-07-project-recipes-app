import React from 'react';
import PropTypes from 'prop-types';
import ShareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const MAX_INGREDIENTS = 20;

export default class ProgressoBebidas extends React.Component {
  constructor() {
    super();
    this.state = {
      recipe: {},
      copyClipboard: '',
      isFavorite: false,
    };
    this.fetchData = this.fetchData.bind(this);
    this.renderIngredients = this.renderIngredients.bind(this);
    this.renderIngredient = this.renderIngredient.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const { match: { params } } = this.props;
    const { id } = params;
    const responseAPI = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const recipe = await responseAPI.json();
    this.setState({
      recipe: recipe.drinks[0],
    });
  }

  async copyClipboard() {
    try {
      console.log('copy clipboard');
      await navigator.clipboard.writeText(window.location.href);
      console.log('copy clipboard write done');
      this.setState({
        copyClipboard: window.location.href,
      });
    } catch (e) {
      console.error(e);
    }
  }

  favoriteRecipe() {
    const { isFavorite } = this.state;
    this.setState({
      isFavorite: !isFavorite,
    });
  }

  renderIngredients() {
    return [...Array(MAX_INGREDIENTS)]
      .map((_, index) => this.renderIngredient(index));
  }

  renderIngredient(index) {
    const { recipe } = this.state;
    const ingredient = recipe[`strIngredient${index + 1}`];
    const measure = recipe[`strMeasure${index + 1}`];
    if (!ingredient || !measure) {
      return;
    }
    const description = `${measure} of ${ingredient}`;
    return (
      <li data-testid={ `${index}-ingredient-step` }>
        {description}
      </li>
    );
  }

  render() {
    const { recipe, copyClipboard, isFavorite } = this.state;
    console.log(recipe);
    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ recipe.strDrinkThumb }
          alt="imagem da receita"
          width="200px"
        />
        <h1 data-testid="recipe-title">{recipe.strDrink}</h1>
        <div>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ this.copyClipboard }
          >
            <img src={ ShareIcon } alt="compartilhar" />
          </button>
        </div>
        <span>
          {copyClipboard ? 'Link copiado!' : ''}
        </span>
        <div>
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ () => this.favoriteRecipe() }
            src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
          >
            <img src={ !isFavorite ? whiteHeartIcon : blackHeartIcon } alt="favorite" />
          </button>
        </div>
        <p data-testid="recipe-category">{recipe.strAlcoholic}</p>
        <ul>{this.renderIngredients()}</ul>
        <p data-testid="instructions">{recipe.strInstructions}</p>

        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          Favoritar
        </button>
      </div>
    );
  }
}

ProgressoBebidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
