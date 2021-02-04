import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavButton() {
  const {
    favorite,
    setFavorite,
    recipe,
  } = useContext(RecipesContext);

  const history = useHistory();
  const path = history.location.pathname;

  const handleFavBtn = () => {
    setFavorite(false);
    if (path.includes('/comidas')) {
      const dataMeal = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const newDataMeal = dataMeal.filter((item) => recipe.idMeal !== item.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newDataMeal));
    } else {
      const dataDrink = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const newDataDrink = dataDrink.filter((item) => recipe.idDrink !== item.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newDataDrink));
    }
  };

  const handleNotFavBtn = () => {
    setFavorite(true);

    if (path.includes('/comidas')) {
      const dataMeal = JSON.parse(localStorage.getItem('favoriteRecipes'));
      localStorage.setItem('favoriteRecipes', JSON.stringify([...dataMeal, {
        id: recipe.idMeal,
        type: 'comida',
        area: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      }]));
    } else {
      const dataDrink = JSON.parse(localStorage.getItem('favoriteRecipes'));
      localStorage.setItem('favoriteRecipes', JSON.stringify([...dataDrink, {
        id: recipe.idDrink,
        type: 'bebida',
        area: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      }]));
    }
  };

  if (favorite) {
    return (
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleFavBtn }
      >
        <img
          src={ blackHeartIcon }
          alt="Favorited Icon"
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ handleNotFavBtn }
    >
      <img
        src={ whiteHeartIcon }
        alt="Not Favorited Icon"
      />
    </button>
  );
}

export default FavButton;
