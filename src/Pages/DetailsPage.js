import React, { useContext } from 'react';
import RecipeContext from '../Context/Context';
import DetailsDrink from './DetailsDrink';
import DetailsMeal from './DetailsMeal';

function DetailsPage() {
  const { detailsRecipe } = useContext(RecipeContext);

  return (
    <div>
      {detailsRecipe.drinks ? <DetailsDrink /> : <DetailsMeal />}
    </div>
  );
}

export default DetailsPage;
