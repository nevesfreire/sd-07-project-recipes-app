import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

import { getRecipesDone } from '../services/localStorage';
import shareRecipe from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipesDoneCard() {
  const [isCopy, setIsCopy] = useState(false);
  const { selectedTypeItem } = useContext(RecipesContext);

  const copyLink = async (data) => {
    await navigator.clipboard.writeText(data);
    setIsCopy(true);
  };

  useEffect(() => {
    getRecipesDone();
  }, []);

  const recipesIsDone = getRecipesDone();
  const filtredRecipesDone = recipesIsDone
    .filter((recipe) => recipe.type !== selectedTypeItem);
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
            <div>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
              </Link>
              <button
                type="button"
                onClick={ () => copyLink(`http://localhost:3000/${recipe.type}s/${recipe.id}`) }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareRecipe }
                  alt={ recipe.name }
                />
              </button>
              <span
                id={ `mensage-${recipe.id}` }
              >
                { isCopy ? 'Link copiado!' : null }
              </span>
              <button
                type="button"
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt={ recipe.name }
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipesDoneCard;
