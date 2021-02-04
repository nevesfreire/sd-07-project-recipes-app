import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
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
    this.copyClipboard = this.copyClipboard.bind(this);
    this.isFavorite = this.isFavorite.bind(this);
  }

  componentDidMount() {
    this.fetchData();
    this.isFavorite();
  }

  isFavorite() {
    const setFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (setFavorite) {
      this.setState({
        isFavorite: true,
      });
    }
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
    const url = window.location.href;
    const newURL = url.split('/in-progress');
    copy(newURL[0]);
    this.setState({
      copyClipboard: true,
    });
  }

  favoriteRecipe() {
    const { recipe, isFavorite } = this.state;
    this.setState({
      isFavorite: !isFavorite,
    });
    const favorite = [{
      id: recipe.idDrink,
      type: 'bebida',
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    }];
    if (isFavorite) {
      localStorage.removeItem('favoriteRecipes');
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
    }
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
      <li data-testid={ `${index}-ingredient-step` } className="ingredient-step">
        <input type="checkbox" />
        {description}
      </li>
    );
  }

  render() {
    const { recipe, copyClipboard, isFavorite } = this.state;
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
