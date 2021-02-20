import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import copy from 'clipboard-copy';
import context from '../contextAPI/context';
import { fetchApi, getFoodRecipeId, getDrinkRecipeId } from '../services/fetchApi';
// import Card from './Card';
import shareIcon from '../images/shareIcon.svg';
import wHeartIcon from '../images/whiteHeartIcon.svg';
import bHeartIcon from '../images/blackHeartIcon.svg';
import Carousel from './Carousel';
import '../css/card.css';

// stackOverflow -> https://stackovetextrflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
const findMatch = (string, object) => (
  Object.keys(object).find((key) => key.match(string))
);

const fetchId = async (pathname, state, setDetail, setRecipeStr) => {
  const id = pathname.split('/')[2];
  if (pathname === `/comidas/${id}`) {
    const newData = await fetchApi(getFoodRecipeId(id));
    setDetail(newData.meals);
    setRecipeStr(state.str.food);
  } else if (pathname === `/bebidas/${id}`) {
    const newData = await fetchApi(getDrinkRecipeId(id));
    setDetail(newData.drinks);
    setRecipeStr(state.str.beverage);
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
  <h1
    data-testid="recipe-title"
    className="card-title"
  >
    {title}
  </h1>
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
      onClick={ () => share(pathname, setShared) }
      type="button"
    >
      <img
        src={ shareIcon }
        alt="share"
      />
    </Button>
  </div>
);

const recipeShareMessage = (shared) => (
  <div>
    { shared ? 'Link copiado!' : null }
  </div>
);

const favoriteIt = (favoriteHeart, setFavoriteHeart, store, item) => {
  setFavoriteHeart(!favoriteHeart);
  if (favoriteHeart) {
    localStorage.setItem('favoriteRecipes', [...store, item]);
  } else {
    const remove = store.filter((favorite) => favorite.id !== item.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(remove));
  }
};
//     Se o favorteH for false => const STORE = OQUEPEGUEI.filter((id) => favoritId !== id)
//   localStorage.setItem('faotu', STORE)
//   se troooo
//   localStorage.setItem('faotu', ...STORE, id)
// );

const recipeFavorite = (favoriteHeart, setFavoriteHeart) => (
  <div>
    <Button
      data-testid="favorite-btn"
      onClick={ () => favoriteIt(favoriteHeart, setFavoriteHeart) }
      type="button"
    >
      <img
        src={ favoriteHeart ? bHeartIcon : wHeartIcon }
        alt="share"
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
  <p
    data-testid="instructions"
    className="card-text"
  >
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
    <Button
      data-testid="start-recipe-btn"
      variant="contained"
      type="button"
      onClick={ () => funcstart(history, pathname) }
      className="startBtn-housing"
    >
      Iniciar Receita
    </Button>
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
  const [recipeStr, setRecipeStr] = useState('');
  const [store, setStore] = useState();
  const [shared, setShared] = useState(false);
  const [favoriteHeart, setFavoriteHeart] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;

  useEffect(() => {
    setStore(localStorage.getItem('favoriteRecipes'));
    const id = pathname.split('/')[2];
    const isFavorite = store.filter((favorite) => favorite.id === id);
    if (isFavorite) setFavoriteHeart(true);
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }, [pathname, store]);

  useEffect(() => {
    fetchId(pathname, state, setDetail, setRecipeStr);
  }, [pathname, state, setDetail]);

  if (!detail) return <div>Loading...</div>;
  const dataDetail = detail[0];
  const url = dataDetail[findMatch(/Thumb/, dataDetail)];
  const title = dataDetail[findMatch(recipeStr, dataDetail)];
  const category = dataDetail[findMatch(/category/i, dataDetail)];
  const instructions = dataDetail[findMatch(/instructions/i, dataDetail)];
  const video = dataDetail[findMatch(/youtube/i, dataDetail)];
  const ingredients = summerizer(/ingredient/i, dataDetail);
  const measures = summerizer(/measure/i, dataDetail);
  const alcoholic = dataDetail[findMatch(/Alcoholic/i, dataDetail)];
  // const message = 'Link copiado!';

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
      {pathname.match('comida') ? recipeVideo(video) : null }
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
