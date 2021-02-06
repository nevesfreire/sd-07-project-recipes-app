import React, { useContext, useEffect } from 'react';
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
    console.log(messageExist);
    if (messageExist === null) {
      const spanFromMessage = document.createElement('div');
      spanFromMessage.id = `${id}-message-span`;
      spanFromMessage.textContent = 'Link copiado!';
      divButtonsGet.appendChild(spanFromMessage);
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
    <>
      {filtredRecipesDone.map((recipe, index) => (
        <div
          key={ index }
          className="card-recipes"
        >
          <div className="class-image">
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                className="card-img-done"
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
          </div>
          <div className="class-items">
            <div className="card-combined-itens">
              <span
                data-testid={ `${index}-horizontal-top-text` }
              >
                { recipe.type === 'comida'
                  ? `${recipe.area} - ${recipe.category}`
                  : recipe.alcoholicOrNot }
              </span>
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
            <div id={ `${index}-div-buttons` } />
            <div>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <h5 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h5>
              </Link>
              <div>
                <span>Receita feita em: </span>
                <span
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  { recipe.doneDate }
                </span>
              </div>
            </div>
            { recipe.tags.length === zero ? null : (
              <div className="buttons-tags">
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
        </div>
      ))}
    </>
  );
}

export default RecipesDoneCard;
