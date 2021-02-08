import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../Context/Context';
import useFetch from '../hooks/useFetch';
import useHandleFavorite from '../hooks/useHandleFavorite';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FoodInProgress() {
  const {
    detailsRecipe,
    mealStateButton,
    setMealStateButton,
    favoriteMeal,
  } = useContext(RecipeContext);
  const [loading, setLoading] = useState(true);
  const { recipeDetailsAPI } = useFetch();
  const [checked] = useState([]);
  const [spanHidden, setSpanHidden] = useState(false);
  const { handleFavFood, mealDidMount } = useHandleFavorite();

  const url = document.URL;
  const newUrlId = url.split('/')[4];
  const newUrlType = url.split('/')[3];

  useEffect(() => {
    recipeDetailsAPI(newUrlId, newUrlType)
      .then(() => setLoading(false));
  }, []);
  function verifyLocalStorage() {
    if (localStorage.getItem('inProgressRecipes') === null) {
      const recipesInProgress = {
        cocktails: {},
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
    }
  }
  console.log('checks', document.getElementsByClassName('check'));

  function enableButton() {
    setMealStateButton(true);
    const markedCheckboxes = document.querySelectorAll('input:checked');
    const checkboxes = document.getElementsByClassName('check');
    console.log('check1', markedCheckboxes.length);
    console.log('check2', checkboxes.length);
    if (checkboxes.length === markedCheckboxes.length) {
      setMealStateButton(false);
    }
  }

  function handleProgress(e) {
    const data = e.target.value;
    console.log(data);
    checked.push(data);
    console.log(checked);
    const localStorageRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const meal = detailsRecipe.meals[0];
    localStorageRecipes.meals[meal.idMeal] = checked;
    localStorage.setItem('inProgressRecipes', JSON.stringify(localStorageRecipes));
    localStorage.setItem(e.target.value, e.target.checked);
    enableButton();
  }

  function handleClickEnd() {
    const meal = detailsRecipe.meals[0];
    const time = new Date();
    const object = [
      {
        id: meal.idMeal,
        type: 'comida',
        category: meal.strCategory,
        alcoholicOrNot: '',
        area: meal.strArea,
        name: meal.strMeal,
        image: meal.strMealThumb,
        doneDate: time,
        tags: meal.strTags.split(','),
      },
    ];

    if (localStorage.getItem('doneRecipes') === null) {
      localStorage.setItem('doneRecipes', JSON.stringify(object));
    } else {
      localStorage.setItem(
        'doneRecipes',
        JSON.stringify([
          ...JSON.parse(localStorage.getItem('doneRecipes')),
          ...object,
        ]),
      );
    }
  }

  useEffect(() => {
    verifyLocalStorage();
  }, []);

  if (loading) {
    return (<div>Loading...</div>);
  }

  const { strCategory,
    strMeal,
    strMealThumb,
    strInstructions,
  } = detailsRecipe.meals[0];

  const currentRecipe = {
    name: strMeal,
  };

  mealDidMount(currentRecipe);

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

  // verifica se a página já carrega como favorito

  function copyToClipBoard(text) {
    const urlToShare = text.split('/in-progress');
    const finalUrlToShare = urlToShare.join('');
    navigator.clipboard.writeText(finalUrlToShare);
    setSpanHidden(true);
  }

  return (
    <div onLoad={ enableButton }>
      <img className="datailsImage" src={ strMealThumb } data-testid="recipe-photo" alt={ strMeal } />
      <div className="iconsAndTitle">
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <div>
      <button
        onClick={ () => copyToClipBoard(url) }
        type="button"
      >
        <img
          src={ shareIcon }
          alt="icone de coração, para favoritar receita"
          data-testid="share-btn"
        />
      </button>
      <span hidden={ !spanHidden }>Link copiado!</span>
      <button onClick={ () => handleFavFood() } type="button">
        <img
          src={ favoriteMeal ? blackHeartIcon : whiteHeartIcon }
          alt="icone de coração, para favoritar receita"
          data-testid="favorite-btn"
        />
      </button>
      </div>
      </div>
      <p data-testid="recipe-category">{strCategory}</p>
      <div className="ingredientsList">
        {allIngredients && allIngredients
          .map((item, index) => (
            <div key={ index } data-testid={ `${index}-ingredient-step` }>
              <label htmlFor={ item.ingredient }>
                <input
                  type="checkbox"
                  className="check"
                  id={ item.ingredient }
                  key={ item.ingredient }
                  name={ item.ingredient }
                  value={ item.ingredient }
                  checked={ JSON.parse(localStorage.getItem(item.ingredient)) }
                  onChange={ (e) => handleProgress(e) }
                />
                {
                  `${index + 1} - ${item.ingredient}: ${item.measure}`
                }
              </label>
            </div>
          ))}
      </div>
      <p
        data-testid="instructions"
        className="ingredientsList"
      >
        {strInstructions}

      </p>
      <Link to="/receitas-feitas">

        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ mealStateButton }
          onClick={ handleClickEnd }
        >
          Finalizar receita

        </button>
      </Link>
    </div>);
}

export default FoodInProgress;
