import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import context from '../contextAPI/context';
import { fetchApi, getFoodRecipeId, getDrinkRecipeId } from '../services/fetchApi';
import { initialize } from '../services/localStorage';
import {
  recipeImage,
  recipeTitle,
  recipeShareMessage,
  recipeFavorite,
  recipeShare,
  recipeCategory,
  recipeIngredients,
  recipeInstructions,
  recipeVideo,
} from './RecipeDetailQuick';
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
    pathname.match('comida') ? 'strMeal' : 'strDrink'
  ), detail)];
  const category = detail[findMatch(/category/i, detail)];
  const alcoholic = detail[findMatch(/Alcoholic/i, detail)];
  const area = detail[findMatch(/area/i, detail)];
  const zero = 0;
  const umCaractMenos = -1;
  const type = (pathname.split('/')[1]).slice(zero, umCaractMenos);

  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const isFavorite = favorites.find((favorite) => favorite.id === id);
  if (isFavorite) setFavoriteHeart(true);
  setStore({
    id,
    type,
    area: pathname.match('comida') ? area : '',
    category: pathname.match('comida') ? category : 'Cocktail',
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

const start = (history, pathname) => {
  history.push(`${pathname}/in-progress`);
};

const recipeStart = (funcstart, history, pathname, initiate) => (
  <div className="startBtn-housing">
    <button
      data-testid="start-recipe-btn"
      variant="contained"
      type="button"
      onClick={ () => funcstart(history, pathname) }
      className="startBtn-housing"
    >
      {initiate ? 'Iniciar Receita' : 'Continuar Receita'}
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
        JSON.stringify({ cocktails: { }, meals: { } }));
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [pathname]);

  useEffect(() => {
    fetchId(pathname, setDetail, setStore, setFavoriteHeart);
  }, [pathname, setDetail, setStore, setFavoriteHeart]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteIds = favorites.map((favorite) => favorite.id);
    if (store) {
      if (favoriteHeart && !favoriteIds.includes(pathname.split('/')[2])) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, store]));
      } else if (!favoriteHeart) {
        const remove = favorites.filter((favorite) => favorite.id !== store.id);
        localStorage.setItem('favoriteRecipes', JSON.stringify([...remove]));
      }
    }
  }, [favoriteHeart, store]);

  if (!detail) return <div>Loading...</div>;
  const dataDetail = detail;

  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const inProgressId = Object
    .keys(inProgress[pathname.match('comida') ? 'meals' : 'cocktails']);
  console.log('inProgressId', inProgressId);
  const initiate = !inProgressId.includes(pathname.split('/')[2]);

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
      {recipeStart(start, history, pathname, initiate)}
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
