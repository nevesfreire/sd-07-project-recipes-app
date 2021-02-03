import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function ButtonDetails({ recipes, id }) {
  const history = useHistory();

  const handlerButtonDetails = () => {
    history.push(`/${recipes}/${id}/in-progress`);
  };

  return (
    <div className="div-button-details">
      <button
        data-testid="start-recipe-btn"
        type="button"
        onClick={ handlerButtonDetails }
      >
        Iniciar Receita
      </button>
    </div>
  );
}

ButtonDetails.propTypes = {
  recipes: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ButtonDetails;
