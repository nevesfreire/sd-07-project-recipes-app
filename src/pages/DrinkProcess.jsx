import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import RecipeDetailsContext from '../context/RecipeContext';
import likeIcon from '../images/whiteHeartIcon.svg';
import fullLikeIcon from '../images/blackHeartIcon.svg';
import ShareButton from '../components/ShareButton';
import { ingredientsMount, saveProgress, handleCheckedFromLocalStorage,
  unLikeRecipe, dateFormat, handleClass,
  handleFinishRecipe } from '../components/func_in-process';
import './foodAndDrinkDetails.css';

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

  const fetchRecipe = async () => {
    const path = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const getRecipe = await fetch(path);
    const result = await getRecipe.json();
    setRecipeTitle(result.drinks[0].strDrink);
    setRecipeCategory(result.drinks[0].strCategory);
    setRecipeImage(result.drinks[0].strDrinkThumb);
    setRecipeInstructions(result.drinks[0].strInstructions);
    setRecipeAlc(result.drinks[0].strAlcoholic);
    ingredientsMount(setRecipeIngredients, result);
    setIsLoading(false);
  };

  const handleChecked = ({ target: { name } }) => {
    saveProgress(setInProgressRecipes, name, id);
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

  const setLikeImage = () => {
    if (localStorage.getItem('favoriteRecipes') !== null) {
      const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const findElement = recipes.find((item) => item.id.toString() === id);
      if (findElement !== undefined) {
        setBtnImg(fullLikeIcon);
      } else {
        setBtnImg(likeIcon);
      }
    } else {
      setBtnImg(likeIcon);
    }
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
        doneDate: dateFormat(),
        tags: '',
      },
    ];

    localStorage.setItem('doneRecipes', JSON.stringify(newDoneData));
  };

  useEffect(() => {
    setTitle('Drink In Progress');
    fetchRecipe();
    setLikeImage();
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
        <button type="button" onClick={ handleImage } className="favorite-btn">
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
            data-testid={ `${index}-ingredient-step` }
          >
            <label
              htmlFor={ item }
              className={ handleClass(item, id) }
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
        { getRecipeInstructions }
      </p>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="finish-recipe-btn"
          disabled={ handleFinishRecipe(getRecipeIngredients.length, id) }
          onClick={ handleDoneLocalStorage }
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
