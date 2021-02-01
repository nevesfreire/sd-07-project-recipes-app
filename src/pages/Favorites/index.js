import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../../components/Header';
import { blackHeartIcon, shareIcon, whiteHeartIcon } from '../../images';
import {
  doFavoriteRecipe,
  getFavoriteRecipes,
  recipeIsFavorite,
} from '../../services/localStorage';

let filter = '';

const handleShareIcon = (target) => {
  const keys = target.id.split(',');
  let urlLinkDetail = '';
  if (keys[1] === 'comida') {
    urlLinkDetail = `http://localhost:3000/comidas/${keys[0]}`;
  } else if (keys[1] === 'bebida') {
    urlLinkDetail = `http://localhost:3000/bebidas/${keys[0]}`;
  }
  copy(urlLinkDetail);
  const shareButton = document.querySelector('.share-btn');
  shareButton.value = 'Link copiado!';
  const paragraph = document.querySelector(`.copied-link-${keys[0]}`);
  const span = document.createElement('span');
  paragraph.appendChild(span);
  span.innerHTML = 'Link copiado!';
};

const recipeCard = (recipes, updateRecipes) => {
  const render = (item, i) => (
    <div key={ i }>
      <Link
        to={
          item.type === 'comida'
            ? `/comidas/${item.id}`
            : `/bebidas/${item.id}`
        }
      >
        <img
          data-testid={ `${i}-horizontal-image` }
          alt={ item.name }
          src={ item.image }
          width="200"
        />
      </Link>
      <p data-testid={ `${i}-horizontal-top-text` }>
        {
          item.type === 'comida'
            ? `${item.area} - ${item.category}`
            : item.alcoholicOrNot
        }
      </p>
      <h4>{i}</h4>
      <Link
        to={
          item.type === 'comida'
            ? `/comidas/${item.id}`
            : `/bebidas/${item.id}`
        }
      >
        <h3 data-testid={ `${i}-horizontal-name` } className="recipe-name">
          { item.name }
        </h3>
      </Link>
      <input
        id={ `${item.id},${item.type}` }
        type="image"
        data-testid={ `${i}-horizontal-share-btn` }
        className="share-btn"
        src={ shareIcon }
        alt="Share recipe"
        onClick={ ({ target }) => handleShareIcon(target) }
      />
      <p className={ `copied-link-${item.id}` } />
      <input
        type="image"
        id={ `${item.id}` }
        data-testid={ `${i}-horizontal-favorite-btn` }
        src={ recipeIsFavorite(item) ? blackHeartIcon : whiteHeartIcon }
        alt="Favorite recipe"
        onClick={ () => updateRecipes(item) }
      />
    </div>
  );

  if (filter !== '') {
    const temp = recipes.filter((e) => e.type === filter);
    return temp.map((recipe, index) => (
      render(recipe, index)
    ));
  }
  if (filter === '') {
    return recipes.map((recipe, index) => render(recipe, index));
  }
  return null;
};

export default function Favorites() {
  const [recipes, setRecipes] = useState([]);
  const applyFilter = (value) => {
    setRecipes([]);
    filter = value;
    setRecipes(getFavoriteRecipes());
  };

  const updateRecipes = (recipe) => {
    setRecipes([]);
    doFavoriteRecipe(recipe);
    setRecipes(getFavoriteRecipes());
  };

  useEffect(() => {
    setRecipes(getFavoriteRecipes());
  }, []);

  const filterButtons = (
    <div>
      <button
        data-testid="filter-by-all-btn"
        onClick={ ({ target }) => applyFilter(target.value) }
        type="button"
        value=""
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        onClick={ ({ target }) => applyFilter(target.value) }
        type="button"
        value="comida"
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ ({ target }) => applyFilter(target.value) }
        type="button"
        value="bebida"
      >
        Drinks
      </button>
    </div>
  );

  const one = 1;

  if (recipes.length < one) {
    return (
      <div>
        <Header title="Receitas Favoritas" />
        <h2>
          Sem receitas favoritadas =(
        </h2>
      </div>
    );
  }

  return (
    <div>
      <Header title="Receitas Favoritas" />
      { filterButtons }
      { recipeCard(recipes, updateRecipes) }
    </div>
  );
}
