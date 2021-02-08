import React, { useContext, useEffect } from 'react';
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
  const zero = 0;
  const data = JSON.parse(localStorage.getItem('favoriteRecipes'));

  useEffect(() => {
    const verifyFavorite = () => {
      if (data) {
        if (path.includes('comidas')) {
          const newData = data.filter((item) => item.id === recipe.idMeal);
          if (newData.length > zero) {
            setFavorite(true);
          } else {
            setFavorite(false);
          }
        } else {
          const newData = data.filter((item) => item.id === recipe.idDrink);
          if (newData.length > zero) {
            setFavorite(true);
          } else {
            setFavorite(false);
          }
        }
      }
    };
    verifyFavorite();
  }, [data, path, recipe.idDrink, recipe.idMeal, setFavorite]);

  const handleFavBtn = () => {
    setFavorite(false);
    if (path.includes('/comidas')) {
      const newDataMeal = data.filter((item) => recipe.idMeal !== item.id);
      localStorage.removeItem('favoriteRecipes', JSON.stringify(newDataMeal));
    } else {
      const newDataDrink = data.filter((item) => recipe.idDrink !== item.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newDataDrink));
    }
  };

  const handleNotFavBtn = () => {
    setFavorite(true);
    if (path.includes('/comidas')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...data, {
        id: recipe.idMeal,
        type: 'comida',
        area: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      }]));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...data, {
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

  // const isFavorite = () => {
  //   if (!favorited.includes(recipe.idMeal)) {
  //     setFavorited([recipe.idMeal, ...favorited]);
  //     const dataMeal = JSON.parse(localStorage.getItem('favoriteRecipes'))
  //       ? JSON.parse(localStorage.getItem('favoriteRecipes'))
  //       : [];
  //     localStorage.setItem('favoriteRecipes', JSON.stringify([...dataMeal, {
  //       id: recipe.idMeal,
  //       type: 'comida',
  //       area: recipe.strArea,
  //       category: recipe.strCategory,
  //       alcoholicOrNot: '',
  //       name: recipe.strMeal,
  //       image: recipe.strMealThumb,
  //     }]));
  //   } else {
  //     setFavorited(favorited.filter((item) => recipe.idMeal !== item));
  //     const dataMeal = JSON.parse(localStorage.getItem('favoriteRecipes'))
  //       ? JSON.parse(localStorage.getItem('favoriteRecipes'))
  //       : [];
  //     const newDataMeal = dataMeal.filter((item) => recipe.idMeal !== item.id);
  //     localStorage.setItem('favoriteRecipes', JSON.stringify(newDataMeal));
  //   }
  // };
  return (
    <button
      type="button"
      onClick={ favorite ? handleFavBtn : handleNotFavBtn }
    >
      <img
        src={ favorite ? blackHeartIcon : whiteHeartIcon }
        alt="Favorited Icon"
        data-testid="favorite-btn"
      />
    </button>
  );
}

export default FavButton;
