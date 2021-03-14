import React from 'react';
import { Button } from '@material-ui/core';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const recipeImage = (url, title) => (
  <img
    src={ url }
    alt={ title }
    data-testid="recipe-photo"
    className="card-img-top"
  />
);

const recipeTitle = (title) => (
  <h1 data-testid="recipe-title">{title}</h1>
);

const recipeShareMessage = (shared) => (
  <div>{ shared ? 'Link copiado!' : null }</div>
);

const favoriteIt = (favoriteHeart, setFavoriteHeart) => {
  setFavoriteHeart(!favoriteHeart);
};

const recipeFavorite = (favoriteHeart, setFavoriteHeart) => (
  <div>
    <Button
      variant="contained"
      className="noShowBtn"
      onClick={ () => favoriteIt(favoriteHeart, setFavoriteHeart) }
      type="button"
    >
      <img
        data-testid="favorite-btn"
        src={ favoriteHeart ? blackHeartIcon : whiteHeartIcon }
        alt={ favoriteHeart ? 'blackHeartIcon' : 'whiteHeartIcon' }
      />
    </Button>
  </div>
);

function share(pathname, setShared) {
  const twoSeconds = 2000;
  copy(`http://localhost:3000${pathname}`);
  setShared(true);
  setTimeout(() => setShared(false), twoSeconds);
}

const recipeShare = (pathname, setShared) => (
  <div>
    <Button
      data-testid="share-btn"
      variant="contained"
      className="noShowBtn"
      onClick={ () => share(pathname, setShared) }
      type="button"
    >
      <img src={ shareIcon } alt="share" />
    </Button>
  </div>
);

const recipeShareOnList = (pathname, setShared, index, test) => (
  <div>
    <Button
      // data-testid={ `${index}-${test}-share-btn` }
      variant="contained"
      className="noShowBtn"
      onClick={ () => share(pathname, setShared) }
      type="button"
    >
      <img
        data-testid={ `${index}-${test}-share-btn` }
        src={ shareIcon }
        alt={ `${index}-${test}-share-btn` }
      />
    </Button>
  </div>
);

const recipeCategory = (category, alcoholic, pathname) => (
  <h3 data-testid="recipe-category">
    {pathname.match('comidas') ? category : alcoholic }
  </h3>
);

const recipeIngredients = (ingredients, measures) => (
  <ul className="">
    { ingredients.map((ingredient, index) => (
      <li
        key={ index }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        { `${ingredient} - ${measures[index]}` }
      </li>
    ))}
  </ul>
);

const recipeInstructions = (instructions) => (
  <p data-testid="instructions" className="card-text">
    {instructions}
  </p>
);

const recipeVideo = (video) => (
  <video
    data-testid="video"
    controls
    src={ video }
  >
    <track src={ video } kind="captions" srcLang="en" />
  </video>
);

export {
  recipeImage,
  recipeTitle,
  recipeShareMessage,
  recipeFavorite,
  recipeShare,
  recipeShareOnList,
  recipeCategory,
  recipeIngredients,
  recipeInstructions,
  recipeVideo,
};
