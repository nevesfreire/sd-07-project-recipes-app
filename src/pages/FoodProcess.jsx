import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import RecipeDetailsContext from '../context/RecipeContext';
import likeIcon from '../images/whiteHeartIcon.svg';
import fullLikeIcon from '../images/blackHeartIcon.svg';
import ShareButton from '../components/ShareButton';
import { ingredientsMount, tagsMount, saveProgress, saveFavoriteRecipe, unLikeRecipe,
  setLikeImage, dateFormat, handleCheckedFromLocalStorage } from '../components/func_details';
import './foodAndDrinkDetails.css';

function FoodProcess({
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
    getRecipeArea,
    setRecipeArea,
    getRecipeCategory,
    setRecipeCategory,
    getRecipeIngredients,
    setRecipeIngredients,
    getRecipeInstructions,
    setRecipeInstructions,
    setRecipeTags,
    getRecipeTags,
  } = context;

  const fetchRecipe = async () => {
    // const path = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771';
    const path = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const getRecipe = await fetch(path);
    const result = await getRecipe.json();
    console.log(result);
    setRecipeTitle(result.meals[0].strMeal);
    setRecipeCategory(result.meals[0].strCategory);
    setRecipeImage(result.meals[0].strMealThumb);
    setRecipeInstructions(result.meals[0].strInstructions);
    setRecipeArea(result.meals[0].strArea);
    tagsMount(setRecipeTags, result);
    ingredientsMount(setRecipeIngredients, result);
    setIsLoading(false);
  };

  const handleChecked = ({ target: { name } }) => {
    saveProgress(setInProgressRecipes, name, id);
  };

  const handleClass = (item) => {
    if (localStorage.getItem('inProgressRecipes')) {
      const previousLocalStorage = JSON
        .parse(localStorage.getItem('inProgressRecipes'));
      const isThere = previousLocalStorage.meals[id]
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
        meals: {
          [id]: [],
        },
        cocktails: {},
      };
      localStorage.setItem('inProgressRecipes', JSON
        .stringify(inProgressRecipesPattern));
    }
  };

  const handleImage = () => {
    const options = {
      id,
      getRecipeArea,
      getRecipeCategory,
      getRecipeTitle,
      getRecipeImage,
    };
    if (btnImg === likeIcon) {
      setBtnImg(fullLikeIcon);
      saveFavoriteRecipe(options);
    } else {
      setBtnImg(likeIcon);
      unLikeRecipe(id);
    }
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

  const handleDoneLocalStorage = () => {
    if (!localStorage.getItem('doneRecipes')) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    const previousDoneData = JSON.parse(localStorage.getItem('doneRecipes'));
    const newDoneData = [
      ...previousDoneData,
      {
        id,
        type: 'comida',
        area: getRecipeArea,
        category: getRecipeCategory,
        alcoholicOrNot: '',
        name: getRecipeTitle,
        image: getRecipeImage,
        doneDate: dateFormat(),
        tags: getRecipeTags,
      },
    ];

    localStorage.setItem('doneRecipes', JSON.stringify(newDoneData));
  };

  useEffect(() => {
    setTitle('Food In Progress');
    fetchRecipe();
    setLikeImage(setBtnImg, id, fullLikeIcon, likeIcon);
    recheckLocalStorage();
  }, []);

  useEffect(() => {
  }, [inProgressRecipes]);

  return (
    <div className="recipe-in-progress-container">
      <img
        src={ getRecipeImage }
        alt={ getRecipeTitle }
        data-testid="recipe-photo"
        className="recipe-in-progress-image"
      />
      <h1 data-testid="recipe-title" className="recipe-in-progress-name">
        { getRecipeTitle }
      </h1>
      <div className="favorite-and-share-btn-container">
        <button type="button" onClick={ handleImage } className="favorite-btn">
          <img src={ btnImg } alt="like" data-testid="favorite-btn" />
        </button>
        <ShareButton path={ pathname } />
      </div>
      <h3 className="recipe-in-progress-category">
        Category-
        <span data-testid="recipe-category">{ getRecipeCategory }</span>
      </h3>
      <ul className="ingredients-checklist">
        { !isLoading && getRecipeIngredients.map((item, index) => (
          <li
            key={ item }
            data-testid={ `${index}-ingredient-step` }
          >
            <label
              htmlFor={ item }
              className={ handleClass(item) }
            >
              <input
                type="checkbox"
                checked={ handleCheckedFromLocalStorage(item, id) }
                name={ item }
                id={ item }
                onChange={ handleChecked }
              />
              { item }
            </label>
          </li>
        ))}
      </ul>
      <p data-testid="instructions" className="recipe-in-progress-instructions">
        {getRecipeInstructions}
      </p>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="finish-recipe-btn"
          disabled={ handleFinishRecipe(getRecipeIngredients.length) }
          onClick={ handleDoneLocalStorage }
        >
          Finalizar receita
        </button>
      </Link>
    </div>
  );
}

FoodProcess.propTypes = {
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

export default FoodProcess;
