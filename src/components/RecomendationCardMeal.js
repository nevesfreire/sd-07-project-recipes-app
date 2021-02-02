import React, { useEffect, useContext, useState } from 'react';
import useFetch from '../hooks/useFetch';
import RecipeContext from '../Context/Context';

function RecomendationCard() {
  const { detailsRecipe, recomendations } = useContext(RecipeContext);
  const { recipeRecomendationsAPI } = useFetch();
  const [loadingRecomendation, setLoadingRecomendation] = useState(true);
  const type = Object.keys(detailsRecipe)[0];
  console.log('recomendations', recomendations.drinks);
  // const recomendationsItens = Object.values(recomendations)[0];

  useEffect(() => {
    recipeRecomendationsAPI(type)
    .then(() => setLoadingRecomendation(false));
  }, []);

  if (loadingRecomendation) {
    return (<div>Loading...</div>);
  }
  
  const zero = 0;
  const seis = 6;
      
  return (
    <div>
      {recomendations.drinks.slice(zero, seis).map((recomendation, index) => (
        <li data-testid={ `${index}-recomendation-card` } key={ index }>{recomendation.strDrink}</li>
      ))}
    </div>
  );
}

export default RecomendationCard;
