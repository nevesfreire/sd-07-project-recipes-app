import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ButtonDetails from './ButtonDetails';
import ButtonsShhareAndFav from './ButtonsShhareAndFav';
import RecipeIngredients from './RecipeIngredients';

function DetailsFood() {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [fav, setFav] = useState(false);
  const [done, setDone] = useState(false);
  const [doing, setDoing] = useState(false);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const { id } = useParams();
  const zero = 0;
  const nine = 9;
  const fortyNine = 49;
  const twenty = 20;
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
    const recipeDone = JSON.parse(window.localStorage.getItem('doneRecipes'));
    if (recipeDone) {
      const findRecipeDone = recipeDone.find(({ id: recipeId }) => recipeId === id);
      if (findRecipeDone) setDone(true);
    }
    const recipeDoing = JSON.parse(window.localStorage.getItem('inProgressRecipes'));
    if (recipeDoing) {
      const { meals } = recipeDoing;
      const findRecipeDoing = meals.find(({ id: recipeId }) => recipeId === id);
      if (findRecipeDoing) setDoing(true);
    }
  }, [id]);

  if (!loading) {
    const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = recipe;
    const youtube = strYoutube.replace('.com', '.com/embed');
    return (
      <div>
        <img src={ strMealThumb } data-testid="recipe-photo" alt="" />
        <ButtonsShhareAndFav fav={ fav } setFav={ setFav } />
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <h3 data-testid="recipe-category">{strCategory}</h3>
        <RecipeIngredients recipeIngredients={ recipeIngredients } />
        <p data-testid="instructions">{strInstructions}</p>
        <iframe
          data-testid="video"
          src={ youtube }
          title="Vídeo da receita"
        />
        <ButtonDetails id={ id } done={ done } doing={ doing } />
      </div>
    );
  }
  return <h1>Loading...</h1>;
}

export default DetailsFood;
