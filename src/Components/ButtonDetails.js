import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function ButtonDetails(props) {
  const {
    idParams,
    done,
    doing } = useContext(RecipesContext);
  const [startRecipe, setStartRecipe] = useState(false);
  const { type } = props;

  if (startRecipe) {
    if (type === 'comida') {
      return <Redirect to={ `/comidas/${idParams}/in-progress` } />;
    }
    return <Redirect to={ `/bebidas/${idParams}/in-progress` } />;
  }
  return (
    <div>
      {!done && (
        <button
          style={ {
            position: 'fixed',
            bottom: 0,
          } }
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => setStartRecipe(true) }
        >
          {doing ? 'Continuar Receita' : 'Iniciar Receita'}
        </button>
      )}
    </div>
  );
}

ButtonDetails.defaultProps = {
  type: 'comida',
};

ButtonDetails.propTypes = {
  type: PropTypes.string,
};

export default ButtonDetails;
