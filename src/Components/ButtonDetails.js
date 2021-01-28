import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function ButtonDetails(props) {
  const { id, done, doing } = props;
  return (
    <div>
      {!done && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => <Redirect to={ `/comidas/${id}/in-progress` } /> }
        >
          {doing ? 'Continuar Receita' : 'Iniciar Receita'}
        </button>
      )}
    </div>
  );
}

ButtonDetails.propTypes = {
  id: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  doing: PropTypes.bool.isRequired,
};

export default ButtonDetails;
