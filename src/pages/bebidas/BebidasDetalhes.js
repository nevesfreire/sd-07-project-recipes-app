import React from 'react';
import PropTypes from 'prop-types';

export default class BebidasDetalhes extends React.Component {
  componentDidMount() {
    const { match: { params } } = this.props;
    const { id } = params;
    const result = fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    console.log(result);
  }

  render() {
    return (
      <div>
        {/* <img data-testid="recipe-photo" src="" /> */}

        <h1 data-testid="recipe-title"> titulo</h1>

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
        <p data-testid="recipe-category"> Texto </p>
        <p data-testid=""/* "${index}-ingredient-name-and-measure" */>Ingredientes</p>
        <p data-testid="instructions"> ingredientes</p>
        {/* <video data-testid="video" width="100px" height="100px">
          <source
            src=""
            type="video"
          />
        </video> */}
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="iniciar-receita-fixo"
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
};
