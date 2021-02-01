import React, { useContext, useEffect } from 'react';
import RecipeContext from '../Context/Context';
import DetailsDrink from './DetailsDrink';
import DetailsMeal from './DetailsMeal';
import useFetch from '../hooks/useFetch'

function DetailsPage() {
  const { typeAndIdDetails } = useContext(RecipeContext);
  const { type } = typeAndIdDetails;

  // useEffect( async () => {
  //   await recipeDetailsAPI( type)
  //   // ingredientsAndMeasure()
  // }, []);



  return (
    <div>
      {type === "bebidas" ? <DetailsDrink /> : <DetailsMeal />}
    </div>
  );
}

export default DetailsPage;
