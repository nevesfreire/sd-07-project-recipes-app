import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getCocktailById } from '../services/cocktailAPI';
import { getMealsRecommendations } from '../services/mealAPI';
import Recommendations from '../components/Recommendations';
import ButtonsDetailsPage from '../components/ButtonsDetailsPage';
import { handleClickCocktails } from '../functions/DetailPages';

function CocktailDetails() {
  const [area, setArea] = useState('');
  const history = useHistory();
  const [recipeId, setRecipeId] = useState('');
  const [storeIngredients, setStoreIngredients] = useState([]);
  const [storeMeasures, setStoreMeasures] = useState([]);
  const [ingredMeasures, setIngredMeasures] = useState([]);
  const [title, setTitle] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [instructions, setInstructions] = useState('');
  const [mealsRecommendations, setMealsRecommendations] = useState([]);

  const handleClick = () => {
    history.push(`/bebidas/${recipeId}/in-progress`);
    handleClickCocktails(recipeId);
  };

  useEffect(() => {
    const path = history.location.pathname;
    const position = 2;
    const numberToSplice = 1;
    const splitPath = path.split('/')
      .splice(position, numberToSplice).toString();
    setRecipeId(splitPath);
    getMealsRecommendations()
      .then((res) => setMealsRecommendations(res));
    getCocktailById(splitPath)
      .then((res) => {
        const ingredientsArray = [];
        const measureArray = [];
        setTitle(res.drinks[0].strDrink);
        setSource(res.drinks[0].strDrinkThumb);
        setCategory(res.drinks[0].strAlcoholic);
        setArea(res.drinks[0].strCategory);
        setInstructions(res.drinks[0].strInstructions);
        Object.entries(res.drinks[0]).forEach(([key, value]) => {
          const noValue = 0;
          const minLength = 1;
          const ingredients = key.startsWith('strIngredient') ? value : noValue;
          const measure = key.startsWith('strMeasure') ? value : noValue;
          if (ingredients !== noValue
            && ingredients !== null && ingredients.length > minLength) {
            ingredientsArray.push(ingredients);
          }
          if (measure !== noValue) {
            measureArray.push(measure);
          }
        });
        setStoreIngredients(...storeIngredients, ingredientsArray);
        setStoreMeasures(...storeMeasures, measureArray);
        const getTogether = ingredientsArray
          .map((ingredient, index) => ({ [ingredient]: measureArray[index] }));
        setIngredMeasures(getTogether);
      });
  }, []);

  return (
    <div className="meal-details-page">
      <img
        alt="Cocktail"
        data-testid="recipe-photo"
        src={ source }
        height="200px"
      />
      <h1 data-testid="recipe-title">{title}</h1>
      <ButtonsDetailsPage
        api={ {
          key: 'cocktail', recipeId, area, category, title, source } }
      />
      <h3 data-testid="recipe-category">{category}</h3>
      <h3>Ingredientes</h3>
      <ul>
        {ingredMeasures.map((element, index) => {
          const [key] = Object.keys(element);
          const [value] = Object.values(element);
          if (value) {
            return (
              <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                { `${key} - ${value}`}
              </li>
            );
          }
          return (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              { `${key}`}
            </li>
          );
        })}
      </ul>
      <h3>Instruções</h3>
      <p data-testid="instructions">{instructions}</p>
      <h3>Recomendações</h3>
      <Recommendations api={ mealsRecommendations } />
      <button
        type="button"
        className="startRecipe"
        data-testid="start-recipe-btn"
        onClick={ handleClick }
      >
        Iniciar Receita
      </button>
    </div>
  );
}

export default CocktailDetails;
