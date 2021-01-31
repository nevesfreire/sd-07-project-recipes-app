import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const { pathname } = useLocation();
  return (
    <>
      <h1>PAGE RECIPE DETAILS</h1>
      <h3>
        SHOW RECIPE ID:
        {' '}
        {recipeId}
        {' '}
        FROM
        {' '}
        {pathname}
      </h3>
    </>
  );
};

export default RecipeDetails;
