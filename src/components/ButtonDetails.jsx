import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function ButtonDetails({ recipes, id, textBtn, dataTestId }) {
  const history = useHistory();

  const handlerButtonDetails = () => {
    history.push(`/${recipes}/${id}/in-progress`);
  };

  return (
    <div className="div-button-details">
      <button
        data-testid={ dataTestId }
        type="button"
        onClick={ handlerButtonDetails }
      >
        {textBtn}
      </button>
    </div>
  );
}

ButtonDetails.propTypes = {
  recipes: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  textBtn: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
};

export default ButtonDetails;
