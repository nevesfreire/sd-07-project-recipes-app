import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import favImgON from '../../images/whiteHeartIcon.svg';
import favImgOFF from '../../images/blackHeartIcon.svg';
import { toggleFav, checkFav } from '../../services/saveLocal';

export default function FavBtn({ mainData, type }) {
  const [favRecipe, setFavRecipe] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setFavRecipe(checkFav(id));
  }, [id]);

  let recipe = {};

  switch (type) {
  case 'bebida':
    recipe = {
      id: mainData.idDrink,
      type: 'bebida',
      area: '',
      category: mainData.strCategory,
      alcoholicOrNot: mainData.strAlcoholic,
      name: mainData.strDrink,
      image: mainData.strDrinkThumb,
    };
    break;
  case 'comida':
    recipe = {
      id: mainData.idMeal,
      type: mainData.type,
      area: mainData.strArea,
      category: mainData.strCategory,
      alcoholicOrNot: mainData.alcoholicOrNot,
      name: mainData.strMeal,
      image: mainData.strMealThumb,
    };
    break;
  default: return null;
  }

  return (
    <button
      type="button"
      onClick={ () => {
        toggleFav(recipe);
        if (favRecipe) {
          setFavRecipe(false);
        } else setFavRecipe(true);
      } }
    >
      <img data-testid="favorite-btn" src={ favRecipe ? favImgON : favImgOFF } alt="compartilhar" />
    </button>
  );
}
