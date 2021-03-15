import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import context from '../contextAPI/context';
import { fetchApi, getFoodRecipeId, getDrinkRecipeId } from '../services/fetchApi';
import {
  recipeImage,
  recipeTitle,
  recipeShareMessage,
  recipeFavorite,
  recipeShare,
  recipeCategory,
  recipeInstructions,
} from './QuickDetails';
import RecipeIntens from './RecipeItens';
import '../css/card.css';

// stackOverflow -> https://stackovetextrflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
const findMatch = (string, object) => (
  Object.keys(object).find((key) => key.match(string))
);

const fetchId = async (pathname, setDetail) => {
  const id = pathname.split('/')[2];
  if (pathname.match('comidas')) {
    const newData = await fetchApi(getFoodRecipeId(id));
    setDetail(newData.meals[0]);
  } else if (pathname.match('bebidas')) {
    const newData = await fetchApi(getDrinkRecipeId(id));
    setDetail(newData.drinks[0]);
  }
};

const finish = (history, pathname) => {
  history.push(`${pathname}/receitas-feitas`);
};

const recipeFinish = (history, pathname) => (
  <button
    data-testid="finish-recipe-btn"
    type="button"
    onClick={ () => finish(history, pathname) }
  >
    Finalizar Receita
  </button>
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

function RecipeProgress() {
  // const [recipeStr, setRecipeStr] = useState('');
  const { detail, setDetail } = useContext(context);
  const [shared, setShared] = useState(false);
  const [favoriteHeart, setFavoriteHeart] = useState();
  const location = useLocation();
  const { pathname } = location;
  const history = useHistory();

  useEffect(() => {
    fetchId(pathname, setDetail);
  }, []);

  const comidas = pathname.match('comidas');
  const bebidas = pathname.match('bebidas');
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const initId = pathname.split('/')[2];

  if (inProgress !== null) {
    if (comidas && !Object.keys(inProgress.meals).includes(initId)) {
      inProgress.meals[initId] = [];
    } else if (bebidas && !Object.keys(inProgress.cocktails).includes(initId)) {
      inProgress.cocktails[initId] = [];
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  }

  if (!detail) return <div>Loading...</div>;
  const id = detail[findMatch(/id/i, detail)];
  const title = detail[findMatch(/title/i, detail)];
  const url = detail[findMatch(/Thumb/, detail)];
  // const title = detail[findMatch(recipeStr, detail)];
  const category = detail[findMatch(/category/i, detail)];
  const instructions = detail[findMatch(/instructions/i, detail)];
  // const video = detail[findMatch(/youtube/i, detail)];
  const ingredients = summerizer(/ingredient/i, detail);
  const measures = summerizer(/measure/i, detail);
  const alcoholic = detail[findMatch(/Alcoholic/i, detail)];

  const type = (caminho) => {
    if (caminho.match('comidas')) {
      return 'meals';
    }
    return 'cocktails';
  };

  const recipeIngredients = (recipeIng, measu) => {
    const thistype = type(pathname);
    return (
      <ul className="">
        { recipeIng.map((ingredient, index) => (
          <RecipeIntens
            key={ index }
            id={ id }
            type={ thistype }
            ingredient={ ingredient }
            measures={ measu }
            index={ index }
          />
        ))}
      </ul>
    );
  };

  return (
    <div>
      {recipeTitle(title)}
      {recipeCategory(category, alcoholic, pathname)}
      {recipeImage(url, title)}
      {recipeShare(pathname, setShared)}
      {recipeShareMessage(shared)}
      {recipeFavorite(favoriteHeart, setFavoriteHeart)}
      {recipeIngredients(ingredients, measures)}
      {recipeInstructions(instructions)}
      {recipeFinish(history, pathname)}
    </div>
  );
}

export default RecipeProgress;
