import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import context from '../contextAPI/context';
import shareIcon from '../images/shareIcon.svg';
import { fetchApi, getFoodRecipeId, getDrinkRecipeId } from '../services/fetchApi';
import RecipeIntens from './RecipeItens';

import '../css/card.css';

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

// stackOverflow -> https://stackovetextrflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
const findMatch = (string, object) => (
  Object.keys(object).find((key) => key.match(string))
);

const recipeTitle = (title) => (
  <h1
    data-testid="recipe-title"
    className="card-title"
  >
    {title}
  </h1>
);

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

const recipeImage = (url, title) => (
  <img
    src={ url }
    alt={ title }
    data-testid="recipe-photo"
    className="card-img-top"
  />
);

const recipeCategory = (category) => (
  <h3 data-testid="recipe-category">
    {category}
  </h3>
);

async function share(pathname) {
  navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
  return (
    <div className="card">Link copiado!</div>
  );
}

const recipeShare = () => (
  <div className="colocaClassNameGente-2">
    <button
      data-testid="share-btn"
      onClick={ () => share() }
      type="button"
    >
      <img
        src={ shareIcon }
        alt="share"
      />
    </button>
  </div>
);

const recipeIngredients = (ingredients, measures) => (
  <ul className="">
    { ingredients.map((ingredient, index) => (
      <RecipeIntens
        key={ index }
        ingredient={ ingredient }
        measures={ measures }
        index={ index }
      />
      // <li
      //   key={ index }
      //   data-testid={ `${index}-ingredient-step` }
      // >
      //   <input
      //   type="checkbox"
      //   id="ingredients"
      //   name="ingredients"
      //   value="ingredients"
      //   >
      //     { `${ingredient} - ${measures[index]}` }
      //     <label for="ingredients"> Ingredientes e medidas</label>

      // </li>
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
  const { detail } = useContext(context);
  // const [recipeStr, setRecipeStr] = useState('');
  const location = useLocation();
  const { pathname } = location;
  const history = useHistory();

  console.log(detail);

  if (!detail) return <div>Loading...</div>;
  const idData = detail;
  const title = idData[findMatch(/title/i, idData)];
  const url = idData[findMatch(/Thumb/, idData)];
  // const title = idData[findMatch(recipeStr, idData)];
  const category = idData[findMatch(/category/i, idData)];
  const instructions = idData[findMatch(/instructions/i, idData)];
  // const video = idData[findMatch(/youtube/i, idData)];
  const ingredients = summerizer(/ingredient/i, idData);
  const measures = summerizer(/measure/i, idData);

  return (
    <div className="card-progress">
      {recipeTitle(title)}
      {recipeCategory(category)}
      {recipeImage(url, title)}
      {recipeShare()}
      {recipeIngredients(ingredients, measures)}
      {recipeInstructions(instructions)}
      {recipeFinish(history, pathname)}
    </div>
  );
}

export default RecipeProgress;
