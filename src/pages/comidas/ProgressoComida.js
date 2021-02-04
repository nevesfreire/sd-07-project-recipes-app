import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import ShareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const MAX_INGREDIENTS = 20;

class ProgressoComida extends React.Component {
  constructor() {
    super();
    this.state = {
      recipe: {},
      copyClipboard: false,
      isFavorite: false,
    };
    this.fetchData = this.fetchData.bind(this);
    this.renderIngredients = this.renderIngredients.bind(this);
    this.renderIngredient = this.renderIngredient.bind(this);
    this.copyingClipboard = this.copyingClipboard.bind(this);
    this.renderToReceitasFeitas = this.renderToReceitasFeitas.bind(this);
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
    const responseAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const recipe = await responseAPI.json();
    this.setState({
      recipe: recipe.meals[0],
    });
  }

  copyingClipboard() {
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
      id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
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

  renderToReceitasFeitas() {
    const { history } = this.props;
    const { recipe } = this.state;
    history.push('/receitas-feitas');
    const doneRecipes = [{
      id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate: '22/6/2020',
      tags: recipe.strTags,
    }];
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  }

  render() {
    const { recipe, copyClipboard, isFavorite } = this.state;
    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ recipe.strMealThumb }
          alt="imagem da receita"
          width="200px"
        />
        <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
        <div>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ this.copyingClipboard }
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
        <p data-testid="recipe-category">{recipe.strCategory}</p>
        <ul>{this.renderIngredients()}</ul>
        <p data-testid="instructions">{recipe.strInstructions}</p>

        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          Favoritar
        </button>
        <button type="button" onClick={ this.renderToReceitasFeitas }>
          Concluída
        </button>
      </div>);
  }
}

export default ProgressoComida;

ProgressoComida.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
