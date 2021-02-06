import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  localStorageDoneRecipes,
  ingredientsListMeals,
  handleClickinProcess,
  changeFavorites } from '../services/functions';
import { apiFoods } from '../services/Services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './ProcessoComidas.css';

function ProcessoComidas({ match: { params: { id } }, history }) {
  const zero = 0;
  const [foodInProgress, setFoodInProgress] = useState([]);
  const [copyLink, setCopyLink] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [count, setCount] = useState(zero);
  const [sizeIngredient, setSizeIngredient] = useState();
  const [redirect, setRedirect] = useState(false);

  const fetchFood = async () => {
    const getFood = await apiFoods(`lookup.php?i=${id}`);
    setFoodInProgress(getFood);
  };

  const initialSize = () => {
    if (foodInProgress.length === zero) return 1;
    const detalhes = foodInProgress[0];
    const ingre = ingredientsListMeals(detalhes).length;
    setSizeIngredient(ingre);
  };

  const changeDisabled = () => {
    if (sizeIngredient === count) return setDisabled(false);
    return setDisabled(true);
  };

  useEffect(() => {
    fetchFood();
    setIsFavorite(changeFavorites(id));
  }, []);

  useEffect(() => {
    initialSize();
    changeDisabled();
  }, [count]);

  if (foodInProgress && foodInProgress.length === zero) return (<h1>Carregando...</h1>);

  const {
    strMealThumb,
    strMeal,
    strArea,
    strCategory,
    strInstructions,
  } = foodInProgress[0];

  const detail = foodInProgress[0];

  function countIngredients({ target }) {
    if (target.checked === true) return setCount((p) => p + 1);
    return setCount((p) => p - 1);
  }

  function favoriteRecipes() {
    const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setIsFavorite(!isFavorite);

    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }

    const currentFavoritesRecipes = {
      id,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };

    localStorage.setItem('favoriteRecipes',
      JSON.stringify([...favoritesRecipes, currentFavoritesRecipes]));
  }

  function allRecipesFavorite() {
    setIsFavorite(!isFavorite);
    const favoriteRecipess = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const newFavorites = favoriteRecipess.filter((favorite) => favorite.id !== id);

    localStorage.setItem('favoriteRecipes',
      JSON.stringify(newFavorites));
  }

  function finishRecipe() {
    localStorageDoneRecipes(detail);
    setRedirect(true);
  }

  return (
    <div>
      <p>comidas in processo</p>
      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid="recipe-photo"
        width="200px"
      />
      <h4 data-testid="recipe-title">{ strMeal }</h4>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => setCopyLink(handleClickinProcess(history)) }
        src={ shareIcon }
      >
        <img
          src={ shareIcon }
          alt="share"
          width="30px"
        />
      </button>
      { copyLink && <p>Link copiado!</p> }
      <button
        data-testid="favorite-btn"
        type="button"
        src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
        onClick={ !isFavorite ? favoriteRecipes : allRecipesFavorite }
      >
        <img
          src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
          alt="whiteHeart"
          width="50px"
        />
      </button>
      <h6 data-testid="recipe-category">{ strCategory }</h6>
      <h6><b>Ingredientes</b></h6>
      <ul>
        { (ingredientsListMeals(detail))
          .map(
            (ingredient, index) => (
              <div
                key={ index }
                data-testid="ingredient-step"
              >
                <input
                  id={ ingredient }
                  value={ ingredient }
                  type="checkbox"
                  name="ingredients-checkbox"
                  key={ index }
                  onClick={ (event) => countIngredients(event) }
                />
                <label
                  htmlFor={ ingredient }
                >
                  { ingredient }
                </label>
              </div>
            ),
          ) }
      </ul>
      <h6><b>Instructions</b></h6>
      <p data-testid="instructions">{ strInstructions }</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ disabled }
        onClick={ finishRecipe }
      >
        Finalizar Receita
      </button>
      {redirect && <Redirect to="/receitas-feitas" />}
    </div>
  );
}

ProcessoComidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.func.isRequired,
};

export default ProcessoComidas;
