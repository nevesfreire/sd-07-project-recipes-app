import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import RecipeDetails from '../components/RecipeDetails';
import FoodAppContext from '../context/FoodAppContext';

function DrinkDetails({ match }) {
  const { handleClickDetail } = useContext(FoodAppContext);

  const { url } = match;
  const requestApi = url.split('/');

  useEffect(() => {
    handleClickDetail(requestApi[1], requestApi[2]);
  }, []);

  return (
    <RecipeDetails />
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default DrinkDetails;
