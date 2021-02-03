import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

  const drink = detailsRecipe.drinks[0];
  const keysDrink = Object.keys(drink);
  const filterDrink = keysDrink
    .filter((key) => key.toLowerCase().includes('ingredient'));
  const filterMeasure = keysDrink.filter((key) => key
    .toLowerCase().includes('measure'));
  console.log(filterMeasure);
  const allIngredients = filterDrink
    .map((item, index) => ({
      ingredient: drink[item], measure: drink[filterMeasure[index]],
    })).filter((item) => item.ingredient !== '' && item.ingredient !== null);

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
          allIngredients && allIngredients.map((item, index) => (
            <li key={ item } data-testid={ `${index}-ingredient-name-and-measure` }>
              {
                `${index + 1} - ${item.ingredient}: ${item.measure}`
              }
            </li>))
        }
      </ul>
      <p data-testid="instructions">{strInstructions}</p>
      <video data-testid="video" width="100">
        <source src={ strYoutube } type="video/mp4" />
        <track default kind="captions" srcLang="en" src={ strYoutube } />
      </video>

      <RecomendationCardDrinks />
      <br />
      <Link to={ `/bebidas/${newUrlId}/in-progress` }>
        <button type="button" data-testid="start-recipe-btn">Iniciar receita</button>
      </Link>

    </div>
  );
}

export default DetailsDrink;
