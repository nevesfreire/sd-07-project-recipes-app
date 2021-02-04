import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getCocktailById } from '../services/cocktailAPI';
import ButtonsDetailsPage from '../components/ButtonsDetailsPage';
import { handleClickMeals } from '../functions/DetailPages';

function CocktailsInProgress() {
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
  const [checked, setChecked] = useState(['']);
  const [className, setClassName] = useState('');
  const [buttonIsEnabled, setButtonIsEnabled] = useState(false);
  const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const handleClick = () => {
    history.push("/receitas-feitas");
  };

  const handleChange = ({target}, ingredient) => {
    if (target.checked) {
      handleClickMeals(recipeId, ingredient);
      setClassName('checked');
    }
    if (checked.length === ingredMeasures.length) {
      setButtonIsEnabled(true);
    }
  }

  useEffect(() => {
    if (getStorage) {
      setChecked(getStorage.cocktails[recipeId]);
    }
    const path = history.location.pathname;
    const position = 2;
    const numberToSplice = 1;
    const splitPath = path.split('/')
      .splice(position, numberToSplice).toString();
    setRecipeId(splitPath);
    getCocktailById(splitPath)
      .then((res) => {
        const ingredientsArray = [];
        const measureArray = [];
        setTitle(res.drinks[0].strDrink);
        setSource(res.drinks[0].strDrinkThumb);
        setCategory(res.drinks[0].strCategory);
        setArea(res.drinks[0].strArea);
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
      <h1 data-testid="recipe-title">{ title }</h1>
      <ButtonsDetailsPage
        api={ {
          key: 'cocktail', recipeId, area, category, title, source } }
      />
      <h3 data-testid="recipe-category">{ category }</h3>
      <h3>Ingredientes</h3>
      <form>
        { ingredMeasures.map((element, index) => {
          const [key] = Object.keys(element);
          const [value] = Object.values(element);
          const isChecked = false;
          if (checked.find(ing => ing === `${key} - ${value}`)) {
            isChecked = true;
          }
          return (
            <div data-testid={ `${index}-ingredient-step` }>
              <input id={`ingredient-${index}`} type="checkbox" key={ index } onChange={() => handleChange(`${key} - ${value}`)} checked={isChecked}/>
              <label className={className} htmlFor={`ingredient-${index}`}>{ `${key} - ${value}` }</label>
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
        disabled={!buttonIsEnabled}
      >
        Finalizar Receita
      </button>

    </div>
  );
}

export default CocktailsInProgress;
