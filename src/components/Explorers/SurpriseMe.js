import React from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';

import { fetchRandom } from '../../services/api';

function SurpriseMe({ path }) {
  const history = useHistory();
  const randomMeals = async () => {
    let type = '';
    if (path.includes('comidas')) {
      type = 'comidas';
    } else {
      type = 'bebidas';
    }
    const id = await fetchRandom(type);
    history.push(`/${type}/${id}`);
  };

  return (
    <button
      className="explore__button"
      data-testid="explore-surprise"
      onClick={ randomMeals }
      style={ { color: 'white', background: '#007bff' } }
      type="button"
    >
      Me Surpreenda!
    </button>
  );
}

SurpriseMe.propTypes = {
  path: PropTypes.string.isRequired,
};

export default SurpriseMe;
