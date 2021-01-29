import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ButtonsShareAndFavFood from './ButtonsShareAndFavFood';
import RecipeIngredients from './RecipeIngredients';
import RecomendationCards from './RecomendationCards';
import RecipesContext from '../context/RecipesContext';

function DetailsFood() {
  const {
    setIdParams,
    recipe,
    setRecipe,
    recipeIngredients,
    setRecipeIngredients,
  } = useContext(RecipesContext);
  const [loading, setLoading] = useState(true);
  const [fav, setFav] = useState(false);
  const { id } = useParams();
  const zero = 0;
  const nine = 9;
  const fortyNine = 49;
  const twenty = 20;
  useEffect(() => {
    setIdParams(id);
  }, []);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const food = await response.json();
      setRecipe(food.meals[0]);
      setLoading(false);
      const array = Object.values(food.meals[0]).slice(nine, fortyNine);
      const pos = array.indexOf('');
      const ingredients = array.map((ingredient, index) => (
        { [ingredient]: array[index + twenty] }
      ));
      const allingredients = ingredients.slice(zero, pos);
      setRecipeIngredients(allingredients);
    };
    fetchRecipe();
  }, [id]);

  if (!loading) {
    const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = recipe;
    const youtube = strYoutube.replace('.com', '.com/embed');
    return (
      <div>
        <img src={ strMealThumb } data-testid="recipe-photo" alt="" />
        <ButtonsShareAndFavFood fav={ fav } setFav={ setFav } recipe={ recipe } />
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <h3 data-testid="recipe-category">{strCategory}</h3>
        <RecipeIngredients recipeIngredients={ recipeIngredients } />
        <p data-testid="instructions">{strInstructions}</p>
        <iframe
          data-testid="video"
          src={ youtube }
          title="Vídeo da receita"
        />
        <RecomendationCards />
      </div>
    );
  }
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}

export default DetailsFood;
