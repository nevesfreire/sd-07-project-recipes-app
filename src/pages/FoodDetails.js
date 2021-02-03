import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import RecipeDetails from '../components/RecipeDetails';
import FoodAppContext from '../context/FoodAppContext';
import '../styles/details.css';
import { Loading } from '../components';

function FoodDetails({ match }) {
  const { handleClickDetail, isLoading } = useContext(FoodAppContext);

  const { url } = match;
  const urlSplitArray = url.split('/');

  useEffect(() => {
    handleClickDetail(urlSplitArray[1], urlSplitArray[2]);
  }, []);

  if (isLoading) {
    return (<Loading />);
  }

  return (
    <RecipeDetails recipes={ urlSplitArray[1] } id={ urlSplitArray[2] } />
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default FoodDetails;
