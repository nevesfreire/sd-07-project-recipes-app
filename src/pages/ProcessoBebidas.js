import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  localStorageDoneRecipes,
  ingredientsListDrinks,
  handleClickinProcess,
  changeFavorites } from '../services/functions';
import { apiDrinks } from '../services/Services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './ProcessoComidas.css';

function ProcessoBebidas({ match: { params: { id } }, history }) {
  const zero = 0;
  const [drinkInProgress, setDrinkInProgress] = useState([]);
  const [copyLink, setCopyLink] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [count, setCount] = useState(zero);
  const [sizeIngredient, setSizeIngredient] = useState();
  const [redirect, setRedirect] = useState(false);

  const fetchDrink = async () => {
    const getFood = await apiDrinks(`lookup.php?i=${id}`);
    setDrinkInProgress(getFood);
  };

  const initialSize = () => {
    if (drinkInProgress.length === zero) return 1;
    const detalhes = drinkInProgress[0];
    const ingre = ingredientsListDrinks(detalhes).length;
    setSizeIngredient(ingre);
  };

  const changeDisabled = () => {
    if (sizeIngredient === count) return setDisabled(false);
    return setDisabled(true);
  };

  useEffect(() => {
    fetchDrink();
    setIsFavorite(changeFavorites(id));
  }, []);

  useEffect(() => {
    initialSize();
    changeDisabled();
  }, [count]);

  if (drinkInProgress && drinkInProgress.length === zero) return (<h1>Carregando...</h1>);

  const {
    strDrinkThumb,
    strDrink,
    strCategory,
    strInstructions,
    strAlcoholic,
  } = drinkInProgress[0];

  const detail = drinkInProgress[0];

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
      type: 'bebidas',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
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
        src={ strDrinkThumb }
        alt={ strDrink }
        data-testid="recipe-photo"
        width="200px"
      />
      <h4 data-testid="recipe-title">{ strDrink }</h4>
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
      {copyLink && <p>Link copiado!</p>}
      <button
        type="button"
        data-testid="favorite-btn"
        src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
        onClick={ !isFavorite ? favoriteRecipes : allRecipesFavorite }
      >
        <img
          src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
          alt="heart"
        />
      </button>
      <h6 data-testid="recipe-category">{ strCategory }</h6>
      <h6><b>Ingredientes</b></h6>
      <ul>
        {(ingredientsListDrinks(detail))
          .map(
            (ingredient, index) => (
              <div
                key="button"
                data-testid="ingredient-step"
              >
                <input
                  id={ ingredient }
                  type="checkbox"
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
          )}
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

ProcessoBebidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.func.isRequired,
};

export default ProcessoBebidas;
