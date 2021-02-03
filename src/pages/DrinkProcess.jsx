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
} from '../components/func_details';

function DrinkProcess(props) {
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
    const path = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const getRecipe = await fetch(path);
    const jsonRecipe = await getRecipe.json();
    setRecipeTitle(jsonRecipe.drinks[0].strDrink);
    setRecipeCategory(jsonRecipe.drinks[0].strCategory);
    setRecipeImage(jsonRecipe.drinks[0].strDrinkThumb);
    setRecipeInstructions(jsonRecipe.drinks[0].strInstructions);
    setRecipeAlc(jsonRecipe.drinks[0].strAlcoholic);
    ingredientsMount(jsonRecipe);
    setIsLoading(false);
  };

  const handleImage = () => {
    if (btnImg === likeIcon) {
      setBtnImg(fullLikeIcon);
      saveFavoriteRecipe();
    } else {
      setBtnImg(likeIcon);
      unLikeRecipe();
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
    setTitle('Drink In Progress');
    fetchRecipe();
    setLikeImage();
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
                checked={ handleCheckedFromLocalStorage(item) }
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
          disabled={ handleFinishRecipe(getRecipeIngredients.length) }
          onClick={ handleDoneLocalStorage }
        >
          Finalizar receita
        </button>
      </Link>
    </div>
  )
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
