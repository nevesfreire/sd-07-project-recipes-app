import React, { useEffect, useContext } from 'react';
import useFetch from '../hooks/useFetch';
import RecipeContext from '../Context/Context';

function RecomandationCard() {
  const { detailsRecipe } = useContext(RecipeContext);
  const { recipeRecomandationsAPI } = useFetch();
  const type = Object.keys(detailsRecipe)[0];

  useEffect(() => {
    recipeRecomandationsAPI(type);
  }, []);

  return (
    <div>
      <p data-testid="0-recomendation-card">Recomandation Card</p>
    </div>
  );
}

export default RecomandationCard;
