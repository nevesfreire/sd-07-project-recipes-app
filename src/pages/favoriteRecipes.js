import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import profileIcon from '../images/profileIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [copied, setCopied] = useState(false);
  const [recipes, setRecipes] = useState();

  useEffect(() => {
    setRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  const shareClicker = (type, id) => {
    setCopied(true);
    return copy(`http://localhost:3000/${type}s/${id}`);
  };

  const removeObjectLocalStorage = (array) => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(array));
  };

  const filterArray = (array, index) => array
    .filter((item) => item.id !== array[index].id);

  const desfavorite = (id) => {
    const index = recipes.findIndex((recipe) => recipe.id === id);
    const newRecipes = [...recipes];

    removeObjectLocalStorage(filterArray(newRecipes, index));
    setRecipes(filterArray(newRecipes, index));
  };

  return (
    <div>
      <div>
        <header>
          <Link to="/perfil">
            <img
              src={ profileIcon }
              alt="profile icon"
              data-testid="profile-top-btn"
            />
          </Link>
          <h1 data-testid="page-title">Receitas Favoritas</h1>
        </header>
      </div>

      <div>
        <button data-testid="filter-by-all-btn" type="button">All</button>
        <button data-testid="filter-by-food-btn" type="button">Food</button>
        <button data-testid="filter-by-drink-btn" type="button">Drink</button>
      </div>

      {
        recipes
        && recipes.map((recipe, index) => (
          <div key={ recipe.id }>
            <img
              style={ { width: '25%' } }
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />

            <h3 data-testid={ `${index}-horizontal-top-text` }>
              {(recipe.type === 'comida')
                ? `${recipe.area} - ${recipe.category}`
                : recipe.alcoholicOrNot }
            </h3>

            <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>

            <label htmlFor="favoriteBtn">
              <input
                type="image"
                src={ blackHeartIcon }
                alt="favorite icon"
                data-testid={ `${index}-horizontal-favorite-btn` }
                id="favoriteBtn"
                onClick={ () => desfavorite(recipe.id) }
              />
            </label>

            <label htmlFor="shareBtn">
              <input
                type="image"
                src={ shareIcon }
                alt="share icon"
                data-testid={ `${index}-horizontal-share-btn` }
                id="shareBtn"
                onClick={ () => shareClicker(recipe.type, recipe.id) }
              />
              {(copied) && 'Link copiado!'}
            </label>

          </div>))
      }
    </div>
  );
}

export default FavoriteRecipes;
