import React, { useContext, useEffect, useState } from 'react';
import RecipeContext from '../Context/Context';

function DetailsMeal() {
  const { detailsRecipe } = useContext(RecipeContext);
  const [listIngredients, setIngredients] = useState();
  const [listMeasures, setMeasures] = useState();
  const { idMeal, strArea, strCategory, strMeal, strMealThumb, strTags, strYoutube, strInstructions} = detailsRecipe.meals[0];
  console.log(detailsRecipe.meals[0]);

  function ingredientsAndMeasure() {
    const allRecipe = Object.entries(detailsRecipe.meals[0]);
    const ingredients = allRecipe.filter(
      (ingredient) => (ingredient[0].includes('strIngredient') && ingredient[1] !== ''),
    );
    const measures = allRecipe.filter(
      (measure) => (measure[0].includes('strMeasure') && measure[1] !== ' '),
    );
    setIngredients(ingredients);
    setMeasures(measures);
    return null;
  }

  useEffect(() => {
    ingredientsAndMeasure();
  }, []);

  return (
    <div>
      <img src={ strMealThumb } data-testid="recipe-photo" alt={ strMeal } />
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">{strCategory}</p>
      <ul>
        {
          listIngredients && listMeasures && listIngredients.map((ingredient, index) => (
            <li key={ ingredient } data-testid={ `${index}ingredient-name-and-measure` }>
              {listMeasures[index][1]}
              of
              { ingredient[1] }
            </li>))
        }
      </ul>
      <p data-testid="instructions">{strInstructions}</p>
      <video data-testid="video" width="100">
        <source src={ strYoutube } type="video/mp4" />
      </video>
      {/* <div data-testid="${str}-recomendation-card">CARD Receitas recomendadas</div> */}
      <button data-testid="start-recipe-btn">Iniciar receita</button>
    </div>
  );
}

export default DetailsMeal;
