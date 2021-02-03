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
  ingredientsMount,
  unLikeRecipe,
  setLikeImage,
  saveFavoriteRecipe,
} from '../components/func_details';

function FoodProcess(props) {
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
  const { match, history: { location: { pathname } } } = props;
  const { params } = match;
  const { id } = params;

  const fetchRecipe = async () => {
    const path = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771';
    // const path = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const getRecipe = await fetch(path);
    const result = await getRecipe.json();
    // console.log(result); chave meals interesse
    setRecipeTitle(result.meals[0].strMeal);
    setRecipeCategory(result.meals[0].strCategory);
    setRecipeImage(result.meals[0].strMealThumb);
    setRecipeInstructions(result.meals[0].strInstructions);
    setRecipeArea(result.meals[0].strArea);
    ingredientsMount(setRecipeIngredients, result);
    setIsLoading(false);
  };

  const saveProgress = (ingredient) => {
    const previousProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(previousProgress)
    if (previousProgress.cocktails[id]) {
      if (previousProgress.cocktails[id].includes(ingredient)) {
        previousProgress.cocktails[id] = previousProgress.cocktails[id]
          .filter((item) => item !== ingredient);
      } else {
        previousProgress.cocktails[id].push(ingredient);
      }
    } else {
      previousProgress.cocktails[id] = [ingredient];
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(previousProgress));
    setInProgressRecipes(previousProgress);
  };

  const handleChecked = ({ target: { name } }) => {
    saveProgress(name);
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

  const handleToogle = (item) => {
    if (localStorage.getItem('inProgressRecipes')) {
      const prevLocalStorage = JSON
        .parse(localStorage.getItem('inProgressRecipes'));
      console.log(prevLocalStorage);
      const onHere = prevLocalStorage.meals[id]
        .find((currentItem) => currentItem === item);
      if (onHere) {
        return 'is-checked';
      }
    }
    return 'is-not-checked';
  };

  useEffect(() => {
    setTitle('Food In Progress');
    fetchRecipe();
    setLikeImage(setBtnImg, id, fullLikeIcon, likeIcon);
  }, [])
  return(
    <div className="recipe-details-container">
      <img
        src={ getRecipeImage }
        alt={ getRecipeTitle }
        data-testid="recipe-photo"
        className="recipe-details-image"
      />
      <h1 data-testid="recipe-title" className="recipe-details-name">
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
        <span data-testid="recipe-category">{getRecipeCategory}</span>
      </h3>
      <ul className="ingredients-checklist">
      { !isLoading && getRecipeIngredients.map((item, index) => (
          <li
            key={ item }
            data-testid={ `${index}-ingredient-step` }
          >
            <label
              htmlFor={ item }
              className={ handleToogle(item) }
            >
              <input
                type="checkbox"
                name={ item }
                id={ item }
                onChange={ handleChecked }
              />
              { item }
            </label>
          </li>
        ))}
      </ul>
      <p data-testid="instructions" className="recipe-details-instructions">
        {getRecipeInstructions}
      </p>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="finish-recipe-btn"
        >
          Finalizar receita
        </button>
      </Link>
    </div>
  )
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
