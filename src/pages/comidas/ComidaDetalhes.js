import React from 'react';
import PropTypes from 'prop-types';
import Carousel from './CarouselComida';

const MAX_INGREDIENTS = 20;

class ComidaDetalhes extends React.Component {
  constructor() {
    super();
    this.state = {
      recipe: {},
    };
    this.fetchData = this.fetchData.bind(this);
    this.renderIngredients = this.renderIngredients.bind(this);
    this.renderIngredient = this.renderIngredient.bind(this);
    this.iniciarReceita = this.iniciarReceita.bind(this);
  }

  componentDidMount() {
    this.fetchData();
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

  iniciarReceita() {
    const { match: { params } } = this.props;
    const { id } = params;
    const { history } = this.props;
    history.push(`/comidas/${id}/in-progress`);
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
    const { recipe } = this.state;
    return (
      <div className="ComidaDetalhes">
        <img
          data-testid="recipe-photo"
          src={ recipe.strMealThumb }
          alt="imagem da receita"
          width="200px"
        />
        <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
        <button
          type="button"
          data-testid="share-btn"
        >
          Compartilhar
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favoritar
        </button>
        <p data-testid="recipe-category">{recipe.strCategory}</p>
        <ul>{this.renderIngredients()}</ul>
        <p data-testid="instructions">{recipe.strInstructions}</p>
        <a data-testid="video" href={ recipe.strYoutube }>Veja o vídeo</a>
        <Carousel />
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="iniciar-receita-fixo"
          onClick={ this.iniciarReceita }
        >
          Iniciar receita
        </button>
      </div>);
  }
}

export default ComidaDetalhes;

ComidaDetalhes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
