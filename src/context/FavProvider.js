import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import FavContext from './FavContext';
import shareIcon from '../images/shareIcon.svg';
import fullLikeIcon from '../images/blackHeartIcon.svg';
import {
  unLikeRecipe,
} from '../components/func_details';

const FavProvider = ({ children }) => {
  const [favorite, setFavorite] = useState([]);
  const [filterFavButton, setFilterFavButton] = useState('all');
  const [pathImage, setPathImage] = useState();

  const getStorage = useCallback((key) => JSON.parse(localStorage.getItem(key)), []);

  const handleShare = (name, id) => {
    console.log(name, id);
    const completePath = `http://localhost:3000/${name}s/${id}`;
    navigator.clipboard.writeText(completePath);
    setPathImage(completePath);
  };

  const clearFavorite = (id) => {
    console.log(id);
    const newFavorites = favorite.filter((recipe) => recipe.id !== id);
    setFavorite(newFavorites);
    unLikeRecipe(id);
  };

  const allFavRecipes = () => {
    const comida = favorite.filter((recipe) => recipe.type === 'comida');
    const bebida = favorite.filter((recipe) => recipe.type === 'bebida');
    let list = {};
    if (filterFavButton === 'comida') {
      list = comida;
    } else if (filterFavButton === 'bebida') {
      list = bebida;
    } else {
      list = favorite;
    }
    console.log(list);

    return list.map((recipe, index) => (
      <div key={ index }>
        <a href={ `/${recipe.type}s/${recipe.id}` }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
            className="image-recipe"
          />
        </a>
        <p data-testid={ `${index}-horizontal-top-text` }>
          {recipe.type === 'comida' ? `${recipe.area} - ${recipe.category}` : recipe.alcoholicOrNot}
        </p>
        <p>{recipe.area}</p>
        <a href={ `/${recipe.type}s/${recipe.id}` }>
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
        </a>
        <div>
          <button
            type="button"
            className="share-btn"
            onClick={ (e) => handleShare(e.target.name, e.target.id) }
          >
            <img
              src={ shareIcon }
              alt="share"
              data-testid={ `${index}-horizontal-share-btn` }
              id={ recipe.id }
              name={ recipe.type }
            />
          </button>
          { pathImage && <p className="share-text">Link copiado!</p> }
        </div>
        <div className="favorite-and-share-btn-container">
          <button type="button" className="favorite-btn" onClick={ (e) => clearFavorite(e.target.id) }>
            <img src={ fullLikeIcon } alt="like" data-testid={ `${index}-horizontal-favorite-btn` } id={ recipe.id } />
          </button>
        </div>
      </div>
    ));
  };

  return (
    <FavContext.Provider
      value={ {
        favorite,
        setFavorite,
        filterFavButton,
        setFilterFavButton,
        allFavRecipes,
        getStorage,
      } }
    >
      {children}
    </FavContext.Provider>
  );
};

export default FavProvider;

FavProvider.propTypes = {
  children: PropTypes.node.isRequired,
}.isRequired;
