import React, { useContext, useEffect, useState } from 'react';
import RecipeContext from '../Context/Context';
import useFetch from '../hooks/useFetch'

function DetailsMeal() {
  const { detailsRecipe, typeAndIdDetails } = useContext(RecipeContext);
  const [listIngredients, setIngredients] = useState();
  const [listMeasures, setMeasures] = useState();
  const { recipeDetailsAPI } = useFetch();
  const { type, id } = typeAndIdDetails;

  function savingMyLife () {
    if (!detailsRecipe.meals) {
      console.log('primeiro if')
      return(
        <p>Loading...</p>
      )
    }
    if (detailsRecipe.meals) {
      console.log('segundo if')
      ingredientsAndMeasure()
    }
  }

  function ingredientsAndMeasure() {
    const { idMeal, strArea, strCategory, strMeal, strMealThumb, strTags, strYoutube, strInstructions} = detailsRecipe.meals[0];
    const allRecipe = Object.entries(detailsRecipe.meals[0]);
    console.log('allrceipes', detailsRecipe.meals[0])
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
  const url = document.URL
  const newUrlId = url.split('/')[4]
  const newUrlType = url.split('/')[3]
  console.log('url', url)
  console.log('newurlId', newUrlId)
  console.log('newurlType', newUrlType)

   useEffect( () => {
  recipeDetailsAPI(newUrlId, newUrlType)
    // ingredientsAndMeasure()
  }, []);

  useEffect( () => {
    savingMyLife()
    // ingredientsAndMeasure()
  },[detailsRecipe]);

  return (<div>
    <p>asad</p>
    {/* {detailsRecipe && 

  
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
  <div data-testid="${str}-recomendation-card">CARD Receitas recomendadas</div>
  <button data-testid="start-recipe-btn">Iniciar receita</button>
</div>} */}
  </div>
  );
}

export default DetailsMeal;
