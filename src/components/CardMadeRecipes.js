import React, { useState } from 'react';

import shareIcon from '../images/shareIcon.svg';

function CardMadeRecipes(doneRecipe, { index }) {
  console.log(doneRecipe, 'recipe');
  const [clipy, setClipy] = useState(false);

  // const url = document.URL;
  //   const newUrlId = url.split('/')[4];
  //   const newUrlType = url.split('/')[3];

  return (
    <div data-testid={ `${index}-horizontal-name` }>
      <div>{doneRecipe.recipe.area}</div>
      <div>{doneRecipe.recipe.category}</div>
      <div data-testid="0-horizontal-done-date">{doneRecipe.recipe.doneDate}</div>
      {/* <div>{doneRecipe.tags[0] && doneRecipe.tags[1]}</div> */}

      <img data-testid={`${index}-horizontal-image`} alt="recipeImg" src={ doneRecipe.recipe.image } />

      <button type="button" onClick={ () => {} }>
        <img src={ shareIcon } alt="img " />
      </button>
    </div>

  );
}

export default CardMadeRecipes;
