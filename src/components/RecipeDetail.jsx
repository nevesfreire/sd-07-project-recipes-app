import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import copy from 'clipboard-copy';
import context from '../contextAPI/context';
import { fetchApi, getFoodRecipeId, getDrinkRecipeId } from '../services/fetchApi';
import { initialize } from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Carousel from './Carousel';
import '../css/card.css';

// stackOverflow -> https://stackovetextrflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
const findMatch = (string, object) => (
  Object.keys(object).find((key) => key.match(string))
);

const assembleStore = (pathname, detail, setStore, setFavoriteHeart) => {
  const id = detail[findMatch(/id/i, detail)];
  const url = detail[findMatch(/Thumb/, detail)];
  const title = detail[findMatch((
    pathname.match('comida') ? 'strMeal' : 'strDrinks'
  ), detail)];
  const category = detail[findMatch(/category/i, detail)];
  const alcoholic = detail[findMatch(/Alcoholic/i, detail)];
  const area = detail[findMatch(/area/i, detail)];
  const type = pathname.split('/')[0];

  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const isFavorite = favorites.find((favorite) => favorite.id === id);
  if (isFavorite) setFavoriteHeart(true);

  setStore({
    id,
    type,
    area,
    category: pathname.match('comida') ? category : '',
    alcoholicOrNot: pathname.match('bebida') ? alcoholic : '',
    name: title,
    image: url,
  });
};

const fetchId = async (pathname, setDetail, setStore, setFavoriteHeart) => {
  const id = pathname.split('/')[2];
  if (pathname === `/comidas/${id}`) {
    const newData = await fetchApi(getFoodRecipeId(id));
    setDetail(newData.meals[0]);
    assembleStore(pathname, newData.meals[0], setStore, setFavoriteHeart);
  } else if (pathname === `/bebidas/${id}`) {
    const newData = await fetchApi(getDrinkRecipeId(id));
    setDetail(newData.drinks[0]);
    assembleStore(pathname, newData.drinks[0], setStore, setFavoriteHeart);
  }
};

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

const start = (history, pathname) => {
  history.push(`${pathname}/in-progress`);
};

const recipeStart = (funcstart, history, pathname) => (
  <div className="startBtn-housing">
    <button
      data-testid="start-recipe-btn"
      variant="contained"
      type="button"
      onClick={ () => funcstart(history, pathname) }
      className="startBtn-housing"
    >
      Iniciar Receita
    </button>
  </div>
);

const summerizer = (stringRegex, data) => {
  const summerized = Object.entries(data)
    .filter((entrie) => {
      if (entrie[0].match(stringRegex) && entrie[1] !== (null || '' || 'null')) {
        return entrie[1];
      }
      return false;
    }).map((entrie) => entrie[1]);
  return summerized;
};

function RecipeDetail() {
  const { state, detail, setDetail } = useContext(context);
  const [store, setStore] = useState({});
  const [shared, setShared] = useState(false);
  const [favoriteHeart, setFavoriteHeart] = useState();
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes') === null) {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({
          cocktails: { },
          meals: { },
        }));
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [pathname]);

  useEffect(() => {
    fetchId(pathname, setDetail, setStore, setFavoriteHeart);
  }, [pathname, setDetail, setStore, setFavoriteHeart]);

  useEffect(() => {
    if (favoriteHeart) {
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, store]));
    }
    if (!favoriteHeart) {
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const remove = favorites.filter((favorite) => favorite.id !== store.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify([...remove]));
    }
  }, [favoriteHeart, store]);

  if (!detail) return <div>Loading...</div>;
  const dataDetail = detail;
  const url = dataDetail[findMatch(/Thumb/, dataDetail)];
  const title = detail[findMatch((
    pathname.match('comida') ? state.str.food : state.str.beverage
  ), detail)];
  const category = dataDetail[findMatch(/category/i, dataDetail)];
  const instructions = dataDetail[findMatch(/instructions/i, dataDetail)];
  const video = dataDetail[findMatch(/youtube/i, dataDetail)];
  const ingredients = summerizer(/ingredient/i, dataDetail);
  const measures = summerizer(/measure/i, dataDetail);
  const alcoholic = dataDetail[findMatch(/Alcoholic/i, dataDetail)];

  return (
    <div className="card">
      {recipeStart(start, history, pathname)}
      {recipeImage(url, title)}
      {recipeTitle(title)}
      {recipeShare(pathname, setShared)}
      {recipeShareMessage(shared)}
      {recipeFavorite(favoriteHeart, setFavoriteHeart)}
      {recipeCategory(category, alcoholic, pathname)}
      {recipeIngredients(ingredients, measures)}
      {recipeInstructions(instructions)}
      { pathname.match('comida') ? recipeVideo(video) : null }
      { pathname.match('comida') ? <Carousel
        recomendations={ state.data.beverage }
        str={ state.str.beverage }
      /> : <Carousel
        recomendations={ state.data.food }
        str={ state.str.food }
      /> }
    </div>
  );
}

export default RecipeDetail;
