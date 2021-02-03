import React, { useContext, useEffect, useState } from 'react';
import RecipeContext from '../Context/Context';
import useFetch from '../hooks/useFetch';
import RecomendationCardDrinks from '../components/RecomendationCardDrinks';

function DetailsDrink() {
  const { detailsRecipe } = useContext(RecipeContext);
  const [loading, setLoading] = useState(true);
  const { recipeDetailsAPI } = useFetch();

  const url = document.URL;
  const newUrlId = url.split('/')[4];
  const newUrlType = url.split('/')[3];

  useEffect(() => {
    recipeDetailsAPI(newUrlId, newUrlType)
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return (<div>Loading...</div>);
  }

  const { strCategory,
    strDrink,
    strDrinkThumb,
    strAlcoholic,
    strYoutube,
    strInstructions,
  } = detailsRecipe.drinks[0];

  const allRecipe = Object.entries(detailsRecipe.drinks[0]);
  console.log('allrceipes', detailsRecipe.drinks[0]);
  const ingredients = allRecipe.filter(
    (ingredient) => (ingredient[0].includes('strIngredient') && ingredient[1] !== ''),
  );
  const measures = allRecipe.filter(
    (measure) => (measure[0].includes('strMeasure') && measure[1] !== ' '),
  );

  return (
    <div>
      <img src={ strDrinkThumb } data-testid="recipe-photo" alt={ strDrink } />
      <h1 data-testid="recipe-title">{strDrink}</h1>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">{strCategory}</p>
      <p data-testid="recipe-category">{strAlcoholic}</p>
      <ul>
        {
          ingredients && measures && ingredients.map((ingredient, index) => (
            <li key={ ingredient } data-testid={ `${index}-ingredient-name-and-measure` }>
              {measures[index][1]}
              of
              { ingredient[1] }
            </li>))
        }
      </ul>
      <p data-testid="instructions">{strInstructions}</p>
      <video data-testid="video" width="100">
        <source src={ strYoutube } type="video/mp4" />
        <track default kind="captions" srcLang="en" src={ strYoutube } />
      </video>
      <RecomendationCardDrinks />
      <button type="button" data-testid="start-recipe-btn">Iniciar receita</button>
    </div>
  );
}

export default DetailsDrink;
