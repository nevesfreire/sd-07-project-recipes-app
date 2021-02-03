import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getMealById } from '../services/mealAPI';
import ButtonsDetailsPage from '../components/ButtonsDetailsPage';
import { handleClickMeals } from '../functions/DetailPages';

function MealsInProgress() {
  const history = useHistory();
  const [recipeId, setRecipeId] = useState('');
  const [storeIngredients, setStoreIngredients] = useState([]);
  const [storeMeasures, setStoreMeasures] = useState([]);
  const [ingredMeasures, setIngredMeasures] = useState([]);
  const [title, setTitle] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [area, setArea] = useState('');
  const [instructions, setInstructions] = useState('');
  const [checked, setChecked] = useState('');

  const handleClick = () => {
    history.push("/receitas-feitas");
    handleClickMeals(recipeId, ingredMeasures);
  };

  const handleChange = ({target}) => {
    if (target.checked) {
      target.classList.add('checked');
    } else {
      target.classList.remove('checked');
    }
  }


  useEffect(() => {
    const path = history.location.pathname;
    const position = 2;
    const numberToSplice = 1;
    const splitPath = path.split('/')
      .splice(position, numberToSplice).toString();
    setRecipeId(splitPath);
    getMealById(splitPath)
      .then((res) => {
        const ingredientsArray = [];
        const measureArray = [];
        setTitle(res.meals[0].strMeal);
        setSource(res.meals[0].strMealThumb);
        setCategory(res.meals[0].strCategory);
        setArea(res.meals[0].strArea);
        setInstructions(res.meals[0].strInstructions);
        Object.entries(res.meals[0]).forEach(([key, value]) => {
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
        alt="Meal"
        data-testid="recipe-photo"
        src={ source }
        height="200px"
      />
      <h1 data-testid="recipe-title">{ title }</h1>
      <ButtonsDetailsPage
        api={ {
          key: 'meal', recipeId, area, category, title, source } }
      />
      <h3 data-testid="recipe-category">{ category }</h3>
      <h3>Ingredientes</h3>
      <form>
        { ingredMeasures.map((element, index) => {
          const [key] = Object.keys(element);
          const [value] = Object.values(element);
          return (
            <div data-testid={ `${index}-ingredient-step` }>
              <input id={`ingredient-${index}`} type="checkbox" key={ index } onChange={handleChange}/>
              <label htmlFor={`ingredient-${index}`}>{ `${key} - ${value}` }</label>
            </div>
          );
        }) }
      </form>

      <h3>Instruções</h3>
      <p data-testid="instructions">{ instructions }</p>

      <button
        type="button"
        className="finishRecipe"
        data-testid="finish-recipe-btn"
        onClick={ handleClick }
      >
        Finalizar Receita
      </button>

    </div>
  );
}

export default MealsInProgress;
