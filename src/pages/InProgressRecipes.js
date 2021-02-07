import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Ingredient,
  ImageDetails,
  TitleDetails,
} from '../components/index';
import FoodAppContext from '../context/FoodAppContext';
import '../styles/details.css';

function InProgressRecipes({ match }) {
  const { handleClickDetail } = useContext(FoodAppContext);

  const { url } = match;
  const urlSplitArray = url.split('/');
  const recipes = urlSplitArray[1];
  const id = urlSplitArray[2];

  useEffect(() => {
    handleClickDetail(recipes, id);
  }, []);

  return (
    <div className="div-recipes-details">
      <ImageDetails recipes={ recipes } />
      <TitleDetails
        recipes={ recipes }
        pathname={ `http://localhost:3000/${recipes}/${id}` }
        id={ id }
      />
      <Ingredient recipes={ recipes } inProgress id={ id } />
    </div>
  );
}

InProgressRecipes.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};

export default InProgressRecipes;
