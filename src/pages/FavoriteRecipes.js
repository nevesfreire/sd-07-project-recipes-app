import React, { useState, useEffect } from 'react';
import HeaderNoSearch from '../components/HeaderNoSearch';
import FavoriteRecipesCards from '../components/FavoriteRecipesCards';
import * as localStorageFunctions from '../services/localStorageFunctions';

function FavoriteRecipes() {
  const [initialFavoriteRecipes, setInitialFavoriteRecipes] = useState([]);
  const [atualFavoriteRecipes, setAtualFavoriteRecipes] = useState([]);

  useEffect(() => {
    setInitialFavoriteRecipes(localStorageFunctions.getFavoriteRecipesLocalStorage());
  }, []);

  useEffect(() => {
    setAtualFavoriteRecipes(initialFavoriteRecipes);
  }, [initialFavoriteRecipes]);

  const filterByFoods = () => {
    const arrayOfFoods = atualFavoriteRecipes.filter((item) => item.type === 'comida');
    setAtualFavoriteRecipes(arrayOfFoods);
  };

  const filterByDrinks = () => {
    const arrayOfDrinks = atualFavoriteRecipes.filter((item) => item.type === 'bebida');
    setAtualFavoriteRecipes(arrayOfDrinks);
  };

  const resetArrayToRender = () => {
    setAtualFavoriteRecipes(initialFavoriteRecipes);
  };

  const removeFavorite = (id) => {
    const atualRenderArray = atualFavoriteRecipes;
    const newRenderArray = atualRenderArray.filter((item) => item.id !== id);
    const arrayInString = JSON.stringify(newRenderArray);
    localStorage.setItem('favoriteRecipes', arrayInString);
    setInitialFavoriteRecipes(newRenderArray);
  };

  const renderElements = (array) => {
    const initialarray = [...array];
    const finalArray = initialarray
      .map((foodOrDrink, index) => (
        <FavoriteRecipesCards
          title={ foodOrDrink.name }
          key={ index }
          index={ index }
          id={ foodOrDrink.id }
          thumb={ foodOrDrink.image }
          type={ foodOrDrink.type }
          tags={ foodOrDrink.tags }
          category={ foodOrDrink.category }
          doneDate={ foodOrDrink.doneDate }
          area={ foodOrDrink.area }
          alcoholicOrNot={ foodOrDrink.alcoholicOrNot }
          removeFavorite={ removeFavorite }
        />
      ));
    return finalArray;
  };
  return (
    <div className="profiles">
      <HeaderNoSearch title="Receitas Favoritas" />
      <div>
        <div className="profile-buttons">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ resetArrayToRender }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ filterByFoods }
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ filterByDrinks }
          >
            Drinks
          </button>
        </div>
      </div>
      {atualFavoriteRecipes === undefined ? (
        <p>Loading</p>
      ) : (
        renderElements(atualFavoriteRecipes)
      )}
    </div>
  );
}

export default FavoriteRecipes;
