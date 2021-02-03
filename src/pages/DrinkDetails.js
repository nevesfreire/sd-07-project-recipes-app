import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import RecipeDetails from '../components/RecipeDetails';
import FoodAppContext from '../context/FoodAppContext';
import '../styles/details.css';

function DrinkDetails({ match }) {
  const { handleClickDetail } = useContext(FoodAppContext);

  const { url } = match;
  const urlSplitArray = url.split('/');

  useEffect(() => {
    handleClickDetail(urlSplitArray[1], urlSplitArray[2]);
  }, []);

  return (
    <RecipeDetails recipes={ urlSplitArray[1] } id={ urlSplitArray[2] } />
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default DrinkDetails;
