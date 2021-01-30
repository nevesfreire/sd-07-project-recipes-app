import React from 'react';
import PropTypes from 'prop-types';

class ComidaDetalhes extends React.Component {
  constructor() {
    super();
    this.state = {
      recipe: {},
    };
    this.fetchData = this.fetchData.bind(this);
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

  render() {
    const { recipe } = this.state;
    console.log(recipe);
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
        <p data-testid=""/* "${index}-ingredient-name-and-measure" */>Ingredientes</p>
        <p data-testid="instructions">{recipe.strInstructions}</p>
        <iframe
          src={ recipe.strYoutube }
          title="video"
          frameBorder="0"
          allowFullScreen
        />
        {/* <video data-testid="video">
          <source
            src={ recipe.strYoutube }
            type="video"
          />
        </video> */}
        {/* <div data-testid="${index}-recomendation-card"> recomendadas</div> */}
        <button
          type="button"
          data-testid="start-recipe-btn"
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
};
