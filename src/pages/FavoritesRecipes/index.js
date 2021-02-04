import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getItem, saveItem, initialize } from '../../services/localStorage';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [favoritesRecipes, setFavoritesRecipes] = useState([]);
  const [showCopiedMessage, setCopiedMessage] = useState('hidden');
  const [isUpdate, setUptade] = useState(false);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const favoritesRecipesFromLocalStorage = getItem('favoriteRecipes');
    if (!favoritesRecipesFromLocalStorage) initialize();
    else setFavoritesRecipes(favoritesRecipesFromLocalStorage);
  }, []);

  useEffect(() => {
    if (isUpdate) {
      const favoritesRecipesFromLocalStorage = getItem('favoriteRecipes');
      setFavoritesRecipes(favoritesRecipesFromLocalStorage);
      setUptade(false);
    }
  }, [favoritesRecipes]);

  const copyLink = (type, id) => {
    const twoSecondes = 2000;
    let kindOfFood = '';
    if (type === 'comida') kindOfFood = 'comidas';
    else kindOfFood = 'bebidas';
    const getUrl = `http://localhost:3000/${kindOfFood}/${id}`;
    copy(getUrl);
    setCopiedMessage('');
    setTimeout(() => { setCopiedMessage('hidden'); }, twoSecondes);
  };

  const disfavorItem = (id) => {
    const favoriteRecipesFromLocalStorage = getItem('favoriteRecipes');
    const newFavoritesRecipe = favoriteRecipesFromLocalStorage
      .filter((recipe) => recipe.id !== id);
    setUptade(true);
    setFavoritesRecipes(newFavoritesRecipe);
    saveItem('favoriteRecipes', newFavoritesRecipe);
  };

  const filterByCondition = (event) => {
    const { value } = event.target;
    setFilterType(value);
  };

  return (
    <div>
      <ul>
        <li>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            value="all"
            onClick={ (e) => filterByCondition(e) }
          >
            Filter All
          </button>
        </li>
        <li>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            value="comida"
            onClick={ (e) => filterByCondition(e) }
          >
            Filter by Food
          </button>
        </li>
        <li>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            value="bebida"
            onClick={ (e) => filterByCondition(e) }
          >
            Filter by Drink
          </button>
        </li>
      </ul>
      <section>
        {favoritesRecipes
          .filter((recipe) => (
            filterType !== 'all'
              ? recipe.type === filterType
              : favoritesRecipes))
          .map(
            ({ alcoholicOrNot,
              area,
              category,
              id,
              image,
              name,
              type,
            }, index) => (
              <div key={ id }>
                <Link to={ `/${type}s/${id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>
                    { name }
                  </p>
                </Link>
                <Link to={ `/${type}s/${id}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ image }
                    width="75px"
                    alt="Foto de Alimento"
                  />
                </Link>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { type === 'bebida' ? alcoholicOrNot : `${area} - ${category}` }
                </p>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  onClick={ () => copyLink(type, id) }
                >
                  <img
                    src={ shareIcon }
                    alt="Ícone de Compartilhar"
                  />
                  Compartilhar
                </button>
                <p hidden={ showCopiedMessage }>Link copiado!</p>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  onClick={ () => disfavorItem(id) }
                >
                  <img
                    src={ blackHeartIcon }
                    alt="Ícone de Favoritar"
                  />
                  Favoritar
                </button>
              </div>
            ),
          )}
      </section>
    </div>
  );
}

export default FavoriteRecipes;
