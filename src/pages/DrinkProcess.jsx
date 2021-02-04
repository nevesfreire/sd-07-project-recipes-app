import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import RecipeDetailsContext from '../context/RecipeContext';
import likeIcon from '../images/whiteHeartIcon.svg';
import fullLikeIcon from '../images/blackHeartIcon.svg';
import ShareButton from '../components/ShareButton';
import './foodAndDrinkDetails.css';
import {
  unLikeRecipe,
  setLikeImage,
} from '../components/func_details';

function DrinkProcess({
  match: { params: { id } },
  history: { location: { pathname } },
}) {
  const contextGlobal = useContext(GlobalContext);
  const { setTitle } = contextGlobal;
  const context = useContext(RecipeDetailsContext);
  const [isLoading, setIsLoading] = useState(true);
  const [inProgressRecipes, setInProgressRecipes] = useState(true);
  const [btnImg, setBtnImg] = useState('');
  const {
    getRecipeTitle,
    setRecipeTitle,
    getRecipeImage,
    setRecipeImage,
    getRecipeAlc,
    setRecipeAlc,
    getRecipeCategory,
    setRecipeCategory,
    getRecipeIngredients,
    setRecipeIngredients,
    getRecipeInstructions,
    setRecipeInstructions,
  } = context;

  const ingredientsMount = (value) => {
    const initialIndex = 0;
    const halfIndex = 2;
    const ingredients = Object.entries(value.drinks[0])
      .filter(
        (item) => item[0].includes('Ingredient') || item[0].includes('Measure'),
      )
      .filter(
        (amount) => amount[1] !== null && amount[1] !== ' ' && amount[1] !== '',
      )
      .map((ar2) => ar2[1]);
    const ingredientsMeasures = [];
    for (let i = initialIndex; i < ingredients.length / halfIndex; i += 1) {
      ingredientsMeasures.push(
        `${ingredients[i]} - ${ingredients[i + ingredients.length / halfIndex]}`,
      );
    }
    setRecipeIngredients(ingredientsMeasures);
  };

  const fetchRecipe = async () => {
    const path = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319';
    // const path = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const getRecipe = await fetch(path);
    const jsonRecipe = await getRecipe.json();
    console.log(jsonRecipe);
    setRecipeTitle(jsonRecipe.drinks[0].strDrink);
    setRecipeCategory(jsonRecipe.drinks[0].strCategory);
    setRecipeImage(jsonRecipe.drinks[0].strDrinkThumb);
    setRecipeInstructions(jsonRecipe.drinks[0].strInstructions);
    setRecipeAlc(jsonRecipe.drinks[0].strAlcoholic);
    ingredientsMount(jsonRecipe);
    setIsLoading(false);
  };

  const saveProgress = (valuIngredient) => {
    const previousProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // console.log(previousProgress)
    if (previousProgress.cocktails[id]) {
      if (previousProgress.cocktails[id].includes(valuIngredient)) {
        previousProgress.cocktails[id] = previousProgress.cocktails[id]
          .filter((item) => item !== valuIngredient);
      } else {
        previousProgress.cocktails[id].push(valuIngredient);
      }
    } else {
      previousProgress.cocktails[id] = [valuIngredient];
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(previousProgress));
    setInProgressRecipes(previousProgress);
  };

  const handleChecked = ({ target: { name } }) => {
    saveProgress(name);
  };

  const handleCheckedFromLocalStorage = (item) => {
    if (localStorage.getItem('inProgressRecipes')) {
      const previousLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      return previousLocalStorage.meals[id].find((currentItem) => currentItem === item);
    }
    return false;
  };

  const handleFinishRecipe = (ingredientsLength) => {
    if (JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      const ingredientsInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (ingredientsLength === ingredientsInProgress.meals[id].length) {
        return false;
      }
      return true;
    }
  };

  const saveFavoriteRecipe = () => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const favoriteRecipes = {
      id,
      type: 'bebida',
      area: '',
      category: getRecipeCategory,
      alcoholicOrNot: getRecipeAlc,
      name: getRecipeTitle,
      image: getRecipeImage,
    };
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    recipes.push(favoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
  };

  const handleImage = () => {
    if (btnImg === likeIcon) {
      setBtnImg(fullLikeIcon);
      saveFavoriteRecipe();
    } else {
      setBtnImg(likeIcon);
      unLikeRecipe(id);
    }
  };

  const handleClass = (item) => {
    if (localStorage.getItem('inProgressRecipes')) {
      const previousLocalStorage = JSON
        .parse(localStorage.getItem('inProgressRecipes'));
      const isThere = previousLocalStorage.cocktails[id]
        .find((currentItem) => currentItem === item);
      if (isThere) {
        return 'is-checked';
      }
    }
    return 'is-not-checked';
  };

  const recheckLocalStorage = () => {
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      const inProgressRecipesPattern = {
        cocktails: {
          [id]: [],
        },
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON
        .stringify(inProgressRecipesPattern));
    }
  };

  const getFormattedDate = () => {
    const monthCorrection = 1;
    const twoDecimalPlaces = 10;
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + monthCorrection;
    const year = date.getFullYear();

    let formatterDay;
    if (day < twoDecimalPlaces) {
      formatterDay = `0${day}`;
    } else {
      formatterDay = day;
    }

    let formatterMonth;
    if (month < twoDecimalPlaces) {
      formatterMonth = `0${month}`;
    } else {
      formatterMonth = month;
    }

    return `${formatterDay}/${formatterMonth}/${year}`;
  };

  const handleDoneLocalStorage = () => {
    if (!localStorage.getItem('doneRecipes')) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    const previousDoneData = JSON.parse(localStorage.getItem('doneRecipes'));
    const newDoneData = [
      ...previousDoneData,
      {
        id,
        type: 'bebida',
        area: '',
        category: getRecipeCategory,
        alcoholicOrNot: getRecipeAlc,
        name: getRecipeTitle,
        image: getRecipeImage,
        doneDate: getFormattedDate(),
        tags: '',
      },
    ];

    localStorage.setItem('doneRecipes', JSON.stringify(newDoneData));
  };

  useEffect(() => {
    setTitle('Drink In Progress');
    fetchRecipe();
    setLikeImage(setBtnImg, id, fullLikeIcon, likeIcon);
    recheckLocalStorage();
  }, []);

  useEffect(() => {
  }, [inProgressRecipes]);

  return (
    <div className="recipe-in-progress-container">
      <img
        data-testid="recipe-photo"
        className="recipe-in-progress-image"
        src={ getRecipeImage }
        alt={ getRecipeTitle }
      />
      <h1
        data-testid="recipe-title"
        className="recipe-in-progress-name"
      >
        { getRecipeTitle }
      </h1>
      <div className="favorite-and-share-btn-container">
        <button type="button" onClick={ handleImage } className="favorite-btn" data-testid="share-btn">
          <img
            src={ btnImg }
            alt="like"
            data-testid="favorite-btn"
          />
        </button>
        <ShareButton path={ pathname } />
      </div>
      <h3 className="recipe-in-progress-category">
        Category-
        <span data-testid="recipe-category">
          { getRecipeCategory }
        </span>
      </h3>
      <ul className="ingredients-checklist">
        { !isLoading && getRecipeIngredients.map((item, index) => (
          <li
            key={ index }
            data-testid="ingredient-step"
          >
            <label
              htmlFor={ item }
              className={ handleClass(item) }
            >
              <input
                type="checkbox"
                // checked={ handleCheckedFromLocalStorage(item) }
                name={ item }
                id={ item }
                // onChange={ handleChecked }
              />
              { item }
            </label>
          </li>
        ))}
      </ul>
      <p data-testid="instructions" className="recipe-in-progress-instructions">
        { getRecipeInstructions }
      </p>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="finish-recipe-btn"
          // disabled={ handleFinishRecipe(getRecipeIngredients.length) }
          // onClick={ handleDoneLocalStorage }
        >
          Finalizar receita
        </button>
      </Link>
    </div>
  );
}

DrinkProcess.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }).isRequired,
};

export default DrinkProcess;
