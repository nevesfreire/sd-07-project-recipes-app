import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

import { getRecipesFavorites } from '../services/localStorage';
import shareRecipe from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipesFavoriteCard() {
  const { selectedTypeItem } = useContext(RecipesContext);

  const copyLink = async ({ target }, data) => {
    await navigator.clipboard.writeText(data);
    const { id } = target;
    const divButtonsGet = document.getElementById(`${id}-div-buttons`);
    const messageExist = document.getElementById(`${id}-message-span`);
    if (!messageExist) {
      const spamFromMessage = document.createElement('span');
      spamFromMessage.id = `${id}-message-span`;
      spamFromMessage.textContent = 'Link copiado!';
      divButtonsGet.appendChild(spamFromMessage);
    } else {
      messageExist.remove();
    }
  };

  const favoriteRecipe = ({ target }) => {
    const storageRecipes = getRecipesFavorites();
    const { alt, className, id } = target;
    if (!className) {
      target.className = 'favorited-recipe';
    } else {
      const idFound = id.split('-')[0];
      const recipeFromRemove = document.getElementById(`${idFound}-recipe-div`);
      recipeFromRemove.remove();
      const filtredRecipes = storageRecipes.filter((recipe) => recipe.name !== alt);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filtredRecipes));
    }
  };

  useEffect(() => {
    getRecipesFavorites();
  }, []);

  let recipesIsDone = getRecipesFavorites();
  if (!recipesIsDone) recipesIsDone = [];
  const filtredRecipesDone = recipesIsDone
    .filter((recipe) => recipe.type !== selectedTypeItem);
  return (
    <>
      {filtredRecipesDone.map((recipe, index) => (
        <div
          key={ index }
          className="card-recipes"
        >
          <div
            className="card-combined-itens"
            id={ `${index}-recipe-div` }
          >
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                className="card-img-done"
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <div>
              <span
                data-testid={ `${index}-horizontal-top-text` }
              >
                { recipe.type === 'comida'
                  ? `${recipe.area} - ${recipe.category}`
                  : recipe.alcoholicOrNot }
              </span>
            </div>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
            </Link>
            <div id={ `${index}-div-buttons` }>
              <button
                type="button"
                onClick={ (event) => copyLink(event, `http://localhost:3000/${recipe.type}s/${recipe.id}`) }
              >
                <img
                  id={ index }
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareRecipe }
                  alt={ recipe.name }
                />
              </button>
              <button
                type="button"
                onClick={ (event) => favoriteRecipe(event) }
              >
                <img
                  id={ `${index}-favorite-img` }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt={ recipe.name }
                  className="favorited-recipe"
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default RecipesFavoriteCard;
