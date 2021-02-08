import React from 'react';
import PropTypes from 'prop-types';
import Carousel from './CarouselBebida';
import ShareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const MAX_INGREDIENTS = 20;

export default class BebidasDetalhes extends React.Component {
  constructor() {
    super();
    this.state = {
      recipe: {},
      copyClipboard: '',
      isFavorite: false,
      isDone: false,
    };
    this.fetchData = this.fetchData.bind(this);
    this.renderIngredients = this.renderIngredients.bind(this);
    this.renderIngredient = this.renderIngredient.bind(this);
    this.iniciarReceita = this.iniciarReceita.bind(this);
    this.copyClipboard = this.copyClipboard.bind(this);
    this.favoriteRecipe = this.favoriteRecipe.bind(this);
    this.isFavorite = this.isFavorite.bind(this);
  }

  componentDidMount() {
    this.fetchData();
    this.isFavorite();
    this.isDone();
  }

  isFavorite() {
    const setFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (setFavorite) {
      this.setState({
        isFavorite: true,
      });
    }
  }

  isDone() {
    const setFavorite = JSON.parse(localStorage.getItem('doneRecipes'));
    if (setFavorite) {
      this.setState({
        isDone: true,
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

  iniciarReceita() {
    const { match: { params } } = this.props;
    const { id } = params;
    const { history } = this.props;
    history.push(`/bebidas/${id}/in-progress`);
  }

  async copyClipboard() {
    await navigator.clipboard.writeText(window.location.href);
    this.setState({
      copyClipboard: window.location.href,
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

  renderIngredient(index) {
    const { recipe } = this.state;
    const ingredient = recipe[`strIngredient${index + 1}`];
    const measure = recipe[`strMeasure${index + 1}`];
    if (!ingredient || !measure) {
      return;
    }
    const description = `${measure} of ${ingredient}`;
    return (
      <li data-testid={ `${index}-ingredient-name-and-measure` }>
        {description}
      </li>
    );
  }

  renderIngredients() {
    return [...Array(MAX_INGREDIENTS)]
      .map((_, index) => this.renderIngredient(index));
  }

  render() {
    const { recipe, copyClipboard, isFavorite, isDone } = this.state;
    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ recipe.strDrinkThumb }
          alt="drink pic"
          width="50%"
        />
        <h1 data-testid="recipe-title">{recipe.strDrink}</h1>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ this.copyClipboard }
        >
          <img src={ ShareIcon } alt="compartilhar" />
        </button>
        <span>
          {copyClipboard ? 'Link copiado!' : ''}
        </span>
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ () => this.favoriteRecipe() }
          src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
        >
          <img src={ !isFavorite ? whiteHeartIcon : blackHeartIcon } alt="favorite" />
        </button>
        <p data-testid="recipe-category">{recipe.strAlcoholic}</p>
        <ul>{this.renderIngredients()}</ul>
        <p data-testid="instructions">{recipe.strInstructions}</p>
        <Carousel />
        <button
          type="button"
          data-testid="start-recipe-btn"
          className={ isDone === false
            ? 'iniciar-receita-fixo' : 'iniciar-receita-fixo hidden-item' }
          onClick={ this.iniciarReceita }
        >
          Iniciar receita
        </button>
      </div>);
  }
}

BebidasDetalhes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
