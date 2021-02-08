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
    <div
      style={ {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      } }
    >
      {doneRecipes.map((doneRecipe, index) => (
        <section
          key={ doneRecipe.id }
          style={ {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          } }
        >
          <img
            alt="favorites-"
            data-testid={ `${index}-horizontal-image` }
            src={ doneRecipe.image }
            style={ { marginTop: '10px', width: '50%', borderRadius: '15px' } }
          />
          <div
            style={ {
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            } }
          >
            <span data-testid={ `${index}-horizontal-top-text` }>
              { doneRecipe.category }
            </span>
            <span>
              <h4 data-testid={ `${index}-horizontal-name` }>
                {doneRecipe.name}
              </h4>
            </span>
            <span data-testid={ `${index}-horizontal-done-date` }>
              {doneRecipe.doneDate}
            </span>
            <img data-testid={ `${index}-horizontal-share-btn` } alt="compartilhe" />
            {doneRecipe.tags.map((tag) => (
              <span
                data-testid={ `${index}-${tag}-horizontal-tag` }
                key={ index }
              >
                { tag }
              </span>))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default DoneFoodCard;
