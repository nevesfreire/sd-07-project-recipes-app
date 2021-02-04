import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import shareIcon from '../images/shareIcon.svg';

function CardMadeRecipes({ recipe, index }) {
  const [spanHidden, setSpanHidden] = useState(false);
   console.log(recipe, 'recipe')

  const urlComidas = `http://localhost:3000/comidas/${recipe.id}`
  const urlBebidas = `http://localhost:3000/bebidas/${recipe.id}`

   function copyToClipBoard(text) {
    navigator.clipboard.writeText(text);
    setSpanHidden(true);
  }  

  return (
    <div>
      {recipe.tags && <div data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }><p>{recipe.tags[0]}</p></div>}
      {recipe.tags && <div data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }><p>{recipe.tags[1]}</p></div>}
      <Link to={ `/comidas/${recipe.id}` }>
      <div data-testid={ `${index}-horizontal-name` }><p>{recipe.name}</p></div>
      </Link>
      {recipe.type === "comida" 
      ? <div data-testid={ `${index}-horizontal-top-text` }><p>{recipe.area} - {recipe.category}</p></div>
      :<div data-testid={ `${index}-horizontal-top-text` }><p>{recipe.alcoholicOrNot}</p></div>}
      <div data-testid={ `${index}-horizontal-done-date` }><p>{recipe.doneDate}</p></div>
      <Link to={ `/comidas/${recipe.id}` }>
      <img data-testid={`${index}-horizontal-image`} alt="recipeImg" src={ recipe.image } />
      </Link>
      {recipe.type === "comida" ? <button type="button" onClick={ () => copyToClipBoard(urlComidas) }>
        <img data-testid={`${index}-horizontal-share-btn`} src={ shareIcon } alt="img " />
      </button>
      : <button type="button" onClick={ () => copyToClipBoard(urlBebidas) }>
      <img data-testid={`${index}-horizontal-share-btn`} src={ shareIcon } alt="img " />
    </button>}
      <span hidden={ !spanHidden }>Link copiado!</span>
    </div>

  );
}

export default CardMadeRecipes;
