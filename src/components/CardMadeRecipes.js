import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function CardMadeRecipes({ recipe, index }) {
  const [clipy, setClipy] = useState(false);

  // const url = document.URL;
  //   const newUrlId = url.split('/')[4];
  //   const newUrlType = url.split('/')[3];

  return (
    <div data-testid={ `${index}-horizontal-name` }>
      <Link to={ `/comidas/${recipe.id}` }>
        <div>{recipe.name}</div>
      </Link>
      <div>{recipe.area}</div>
      <div>{recipe.category}</div>
      <div data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</div>
      <div>{recipe.tags[0,1]}</div>
      <Link to={ `/comidas/${recipe.id}` }>

        <img data-testid="0-horizontal-image" alt="recipeImg" src={ recipe.image } />
      </Link>

      <button data-testid={ `${index}-horizontal-share-btn` } type="button" onClick={ () => {} }>
        <img src={ shareIcon } alt="img " />
      </button>
    </div>

  );
}

export default CardMadeRecipes;
