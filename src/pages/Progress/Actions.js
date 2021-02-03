import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import copy from 'clipboard-copy';
import { Context } from '../../context/Provider';
import { getItem, saveItem } from '../../services/localStorage';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function formatFavorite(data, api) {
  let drinkOrMeal = '';
  if (api === '') return;
  if (api === 'meal') drinkOrMeal = 'comida';
  else drinkOrMeal = 'bebida';

  const favoriteRecipesArray = getItem('favoriteRecipes') || [];

  const isRecipeFavorite = favoriteRecipesArray
    .some((recipe) => recipe.id === data.id);

  let alcoholic = '';

  if (data.alcoholic) {
    alcoholic = 'Alcoholic';
  }

  const objFavorite = {
    id: data.id,
    type: drinkOrMeal,
    area: data.area || '',
    category: data.category,
    alcoholicOrNot: alcoholic,
    name: data.name,
    image: data.src,
  };

  if (!isRecipeFavorite) {
    favoriteRecipesArray.push(objFavorite);
  } else {
    const index = favoriteRecipesArray.map((recipe) => recipe.id).indexOf(data.id);
    favoriteRecipesArray.splice(index, 1);
  }
  saveItem('favoriteRecipes', favoriteRecipesArray);
}

function Actions({ data, isFavorite, setIsFavorite }) {
  const {
    api,
  } = useContext(Context);

  const [msg, setMsg] = useState('');

  const setAsFavorite = () => {
    formatFavorite(data, api);
    setIsFavorite((prev) => !prev);
  };

  return (
    <nav>
      <Button
        data-testid="favorite-btn"
        onClick={ setAsFavorite }
      >
        <img
          // data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="heartIcon"
        />
        Favorite
      </Button>
      <Button
        data-testid="share-btn"
        onClick={ () => {
          const recipe = (api === 'meal' ? 'comidas' : 'bebidas');
          copy(`http://localhost:3000/${recipe}/${data.id}`);
          setMsg('Link copiado!');
        } }
      >
        Share
      </Button>
      <Button data-testid="finish-recipe-btn">
        Finish
      </Button>
      <div>{msg}</div>
    </nav>
  );
}

export default Actions;
