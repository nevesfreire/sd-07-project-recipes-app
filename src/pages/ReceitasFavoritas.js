import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import FavoriteCards from '../Components/FavoriteCards';

function ReceitasFavoritas() {
  const [favoriteFoods, setFavoriteFoods] = useState([]);
  const [favoriteDrink, setFavoriteDrink] = useState([]);
  const [favoriteAll, setFavoriteAll] = useState([]);
  const favoriteInital = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [favorites, setFavorites] = useState(favoriteInital);

  const getFavorites = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteAll(favoriteRecipes);

    if (favoriteRecipes) {
      favoriteRecipes.map((recipe) => {
        if (recipe.type === 'comida') {
          setFavoriteFoods((prevState) => ([...prevState, recipe]));
        }
        if (recipe.type === 'bebida') {
          setFavoriteDrink((prevState) => ([...prevState, recipe]));
        }
        return 1;
      });
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div>
      <Header text="Receitas Favoritas" search={ false } />
      <div className="buttons__profile">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setFavorites(favoriteAll) }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => setFavorites(favoriteFoods) }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setFavorites(favoriteDrink) }
        >
          Drinks
        </button>
      </div>
      <FavoriteCards favorites={ favorites } />
    </div>
  );
}

export default ReceitasFavoritas;
