import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

import { getRecipesDone } from '../services/localStorage';
import shareRecipe from '../images/shareIcon.svg';

function RecipesDoneCard() {
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

  useEffect(() => {
    getRecipesDone();
  }, []);

  let recipesIsDone = getRecipesDone();
  if (!recipesIsDone) recipesIsDone = [];
  const filtredRecipesDone = recipesIsDone
    .filter((recipe) => recipe.type !== selectedTypeItem);
  const zero = 0;
  return (
    <div className="card-my-recipes">
      {filtredRecipesDone.map((recipe, index) => (
        <div key={ index }>
          <div className="card-combined-itens">
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
            </div>
          </div>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
          </Link>
          <div>
            <span>Receita feita em: </span>
            <span
              data-testid={ `${index}-horizontal-done-date` }
            >
              { recipe.doneDate }
            </span>
          </div>
          { recipe.tags.length === zero ? null : (
            <div>
              <button
                type="button"
                data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }
              >
                { recipe.tags[0] }
              </button>
              <button
                type="button"
                data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }
              >
                { recipe.tags[1] }
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default RecipesDoneCard;
