import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../Context/Context';
import useFetch from '../hooks/useFetch';
import RecomendationCardMeal from '../components/RecomendationCardMeal';
import '../css/Button.css';

function DetailsMeal() {
  const { detailsRecipe } = useContext(RecipeContext);
  const [loading, setLoading] = useState(true);
  const { recipeDetailsAPI } = useFetch();

  const url = document.URL;
  const newUrlId = url.split('/')[4];
  const newUrlType = url.split('/')[3];

  useEffect(() => {
    recipeDetailsAPI(newUrlId, newUrlType)
      .then(() => setLoading(false));
    // ingredientsAndMeasure();
  }, []);

  if (loading) {
    return (<div>Loading...</div>);
  }

  const { strCategory,
    strMeal,
    strMealThumb,
    strYoutube,
    strInstructions,
  } = detailsRecipe.meals[0];

  const meal = detailsRecipe.meals[0];
  const keysMeal = Object.keys(meal);
  const filterMeal = keysMeal
    .filter((key) => key.toLowerCase().includes('ingredient'));
  const filterMeasure = keysMeal
    .filter((key) => key.toLowerCase().includes('measure'));
  const allIngredients = filterMeal
    .map((item, index) => ({
      ingredient: meal[item], measure: meal[filterMeasure[index]],
    })).filter((item) => item.ingredient !== '' && item.ingredient !== null);

  return (
    <div>
      <img src={ strMealThumb } data-testid="recipe-photo" alt={ strMeal } />
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">{strCategory}</p>
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

      <RecomendationCardMeal />
      <br />
      <Link to={ `/comidas/${newUrlId}/in-progress` }>
        <button className="buttn-bottom" type="button" data-testid="start-recipe-btn">Iniciar receita</button>
      </Link>

    </div>
  );
}

export default DetailsMeal;
