import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchFoodById } from '../../redux/actions/foodActions';

import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function ComidasID() {
  const { id } = useParams();

  useEffect(() => {
    fetchFoodById();
  }, []);
  return (
    <div>
      <img
        data-testid="recipe-photo"
        alt=""
        src=""
      />
      <h2
        data-testid="recipe-title"
      >
        titulo
      </h2>
      <button type="button" data-testid="share-btn">
        <img alt="" src={ shareIcon } />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img alt="" src={ whiteHeartIcon } />
      </button>
      <h4 data-testid="recipe-category">texto da categoria</h4>
      {/** inserir lista de ingredientes aqui
       * data-testid="${index}-ingredient-name-and-measure" */}
      <p data-testid="instructions">instruções</p>
      {/** data-testid="video" para video */}
      {/** card de recomendaçoes data-testid="${index}-recomendation-card" */}
      <Link
        to="/.../in-progress"
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
      >
        iniciar/continuar receita
        {/** esse botão desaparece caso receita já tenha sido feita */}
      </Link>
    </div>
  );
}

const mapStateToProps = {};

const mapDispatchToProps = { fetchFoodById };

export default connect(mapStateToProps, mapDispatchToProps)(ComidasID);
