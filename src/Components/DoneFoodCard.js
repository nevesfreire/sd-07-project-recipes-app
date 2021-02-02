import React, { useEffect, useState } from 'react';

function DoneFoodCard() {
  const [doneRecipes, setdoneRecipes] = useState([]);

  useEffect(() => {
    const madenRecipes = window.localStorage.getItem('doneRecipes');
    if (madenRecipes) {
      const madeRecipesParse = JSON.parse(madenRecipes);
      setdoneRecipes(madeRecipesParse);
      console.log(madeRecipesParse);
    }
  }, []);

  return (
    <div>
      {doneRecipes.map((doneRecipe, index) => (
        <section key={ doneRecipe.id }>
          <img
            alt="favorites-"
            data-testid={ `${index}-horizontal-image` }
            src={ doneRecipe.image }
          />
          <span data-testid={ `${index}-horizontal-top-text` }>
            { doneRecipe.category }
          </span>
          <h5 data-testid={ `${index}-horizontal-name` }>
            {doneRecipe.name}
          </h5>
          <span data-testid={ `${index}-horizontal-done-date` }>
            {doneRecipe.doneDate}
          </span>
          <img data-testid={ `${index}-horizontal-share-btn` } alt="compartilhe" />
          {doneRecipe.tags.map((tag, tagIndex) => (
            <span
              data-testid={ `${tagIndex}-${tag}-horizontal-tag` }
              key={ tagIndex }
            >
              { tag }
            </span>))}
        </section>
      ))}
    </div>
  );
}

export default DoneFoodCard;
