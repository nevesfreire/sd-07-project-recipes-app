import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import share from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function ButtonsShareAndFavDrinks(props) {
  const { fav, setFav, recipe } = props;

  useEffect(() => {
    const favRecipe = JSON.parse(window.localStorage.getItem('favoriteRecipes'));
    if (favRecipe) {
      const favoriteRecipe = favRecipe.find(({ id }) => id === recipe.idDrink);
      if (favoriteRecipe) {
        setFav(true);
      }
    }
  }, []);

  const saveFavorites = () => {
    const { idDrink, strCategory, strDrink, strDrinkThumb, strAlcoholic } = recipe;
    const favRecipe = JSON.parse(window.localStorage.getItem('favoriteRecipes'));
    if (!favRecipe) {
      window.localStorage.setItem('favoriteRecipes', JSON.stringify([{
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory || '',
        alcoholicOrNot: strAlcoholic || '',
        name: strDrink,
        image: strDrinkThumb,
      }]));
      setFav(true);
      return true;
    }
    const favoriteRecipe = favRecipe.find(({ id }) => id === idDrink);
    if (!favoriteRecipe) {
      window.localStorage.setItem('favoriteRecipes', JSON.stringify([...favRecipe,
        {
          id: idDrink,
          type: 'bebida',
          area: '',
          category: strCategory || '',
          alcoholicOrNot: strAlcoholic || '',
          name: strDrink,
          image: strDrinkThumb,
        },
      ]));
      setFav(true);
      return true;
    }
    window.localStorage.setItem('favoriteRecipes',
      JSON.stringify(favRecipe.filter(({ id }) => id !== recipe.idDrink)));
    setFav(false);
  };

  return (
    <div>
      <button data-testid="share-btn" type="button">
        <img src={ share } alt="" />
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
        onClick={ saveFavorites }
        src={ fav ? blackHeart : whiteHeart }
      >
        <img src={ fav ? blackHeart : whiteHeart } alt="" />
      </button>
    </div>
  );
}

ButtonsShareAndFavDrinks.propTypes = {
  recipe: PropTypes.objectOf.isRequired,
  fav: PropTypes.bool.isRequired,
  setFav: PropTypes.func.isRequired,
};

export default ButtonsShareAndFavDrinks;
