import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import RecipeDetails from '../components/RecipeDetails';
import FoodAppContext from '../context/FoodAppContext';
import '../styles/details.css';
import { Loading } from '../components';

function FoodDetails({ match }) {
  const { handleClickDetail, isLoading } = useContext(FoodAppContext);

  const { url } = match;
  const requestApi = url.split('/');

  useEffect(() => {
    handleClickDetail(requestApi[1], requestApi[2]);
  }, []);

  if (isLoading) {
    return (<Loading />);
  }

  return (
    <RecipeDetails recipes={ requestApi[1] } id={ requestApi[2] } />
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default FoodDetails;
