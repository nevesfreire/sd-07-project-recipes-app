import React from 'react';
import { connect } from 'react-redux';

class ComidaDetalhes extends React.Component {
  render() {
    const { recipeById } = this.props;
    console.log(recipeById);
    return (
      <div className="ComidaDetalhes">
        {/* <img data-testid="recipe-photo" src="" /> */}

        <h1 data-testid="recipe-title">Title</h1>

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
        >
          Iniciar receita
        </button>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  recipeById: state.reducerComidas.recipeById,
});

export default connect(mapStateToProps)(ComidaDetalhes);
