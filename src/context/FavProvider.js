import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FavContext from './FavContext';
import shareIcon from '../images/shareIcon.svg';
import likeIcon from '../images/whiteHeartIcon.svg';
import fullLikeIcon from '../images/blackHeartIcon.svg';

const FavProvider = ({ children }) => {
  const [favorite, setFavorite] = useState([
    {
      id: '52771',
      type: 'comidas',
      area: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image:
        'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',

    },
    {
      id: '52741',
      type: 'bebidas',
      area: '',
      category: '',
      alcoholicOrNot: 'Alcoholic',
      name: 'Caipirinha',
      image:
        'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
  ]);
  const [filterFavButton, setFilterFavButton] = useState('all');
  const [pathImage, setPathImage] = useState();
  const [btnImg, setBtnImg] = useState('');

  const handleImage = () => {
    if (btnImg === likeIcon) {
      setBtnImg(fullLikeIcon);
    } else {
      setBtnImg(likeIcon);
    }
  };

  const handleShare = (name, id) => {
    console.log(name, id);
    const completePath = `http://localhost:3000/${name}/${id}`;
    navigator.clipboard.writeText(completePath);
    setPathImage(completePath);
  };

  const allFavRecipes = () => {
    const comida = favorite.filter((recipe) => recipe.type === 'comidas');
    const bebida = favorite.filter((recipe) => recipe.type === 'bebidas');
    let list = {};
    if (filterFavButton === 'comidas') {
      list = comida;
    } else if (filterFavButton === 'bebidas') {
      list = bebida;
    } else {
      list = favorite;
    }
    console.log(list);

    return list.map((recipe, index) => (
      <div key={ index }>
        <a href={ `/${recipe.type}/${recipe.id}` }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />
        </a>
        <p data-testid={ `${index}-horizontal-top-text` }>
          {recipe.type === 'comida' ? recipe.category : recipe.alcoholicOrNot}
        </p>
        <p>{recipe.area}</p>
        <a href={ `/${recipe.type}/${recipe.id}` }>
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
        </a>
        <div>
          <button
            type="button"
            className="share-btn"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ (e) => handleShare(e.target.name, e.target.id) }
          >
            <img
              src={ shareIcon }
              alt="share"
              data-testid="share-btn"
              id={ recipe.id }
              name={ recipe.type }
            />
          </button>
          { pathImage && <p className="share-text">Link copiado!</p> }
        </div>
        <div className="favorite-and-share-btn-container">
          <button type="button" onClick={ handleImage } className="favorite-btn">
            <img src={ btnImg } alt="like" data-testid="favorite-btn" />
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
