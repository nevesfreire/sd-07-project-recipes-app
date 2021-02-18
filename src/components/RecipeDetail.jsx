import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import context from '../contextAPI/context';
import { fetchApi, getFoodRecipeId, getDrinkRecipeId } from '../services/fetchApi';
import shareIcon from '../images/shareIcon.svg';
// import Card from './Card';

/* 34 - Realize uma request para a API passando o id da receita que deve estar disponível nos parâmetros da URL
Observações técnicas

Verifica se a requisição para a API de comidas foi realizada. O endpoint utilizado deve ser https://www.themealdb.com/api/json/v1/1/lookup.php?i={id-da-receita};
Verifica se a requisição para a API de bebidas foi realizada. O endpoint utilizado deve ser https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={id-da-receita}.
O que será verificado:

- Verifica se a requisição para a API de comidas foi realizada
- Verifica se a requisição para a API de bebidas foi realizada
 */

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

async function share(pathname) {
  navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
  return (
    <div className="card">Link copiado!</div>
  );
}

const recipeShare = (pathname) => (
  <div>
    <button
      data-testid="share-btn"
      onClick={ () => share(pathname) }
      type="button"
    >
      <img
        src={ shareIcon }
        alt="share"
      />
    </button>
  </div>
);

const recipeCategory = (category) => (
  <h3 data-testid="recipe-category">
    {category}
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

// const recipeRecommendation = (recommendation) => (
//   recommendation.map((recommend, index) => (
//     <Card
//       key={ recommend[findMatch('id', recommend)] }
//       pathname={ pathname }
//       id={ recommend[findMatch('id', recommend)] }
//       Name={ recommend[findMatch(recipeStr, recommend)] }
//       Thumb={ recommend[findMatch(/Thumb/, recommend)] }
//       Index={ index }
//       Test="recomendation-card"
//     />
//   ))
// );

const start = (history, pathname) => {
  history.push(`${pathname}/in-progress`);
};

const recipeStart = (funcstart, history, pathname) => (
  <button
    data-testid="start-recipe-btn"
    type="button"
    onClick={ () => funcstart(history, pathname) }
  >
    Iniciar Receita
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

function RecipeDetail() {
  const { state, detail, setDetail } = useContext(context);
  const [recipeStr, setRecipeStr] = useState('');
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;

  useEffect(() => {
    fetchId(pathname, state, setDetail, setRecipeStr);
  }, [pathname, state]);

  if (!detail) return <div>Loading...</div>;
  const dataDetail = detail[0];
  const url = dataDetail[findMatch(/Thumb/, dataDetail)];
  const title = dataDetail[findMatch(recipeStr, dataDetail)];
  const category = dataDetail[findMatch(/category/i, dataDetail)];
  const instructions = dataDetail[findMatch(/instructions/i, dataDetail)];
  const video = dataDetail[findMatch(/youtube/i, dataDetail)];
  const ingredients = summerizer(/ingredient/i, dataDetail);
  const measures = summerizer(/measure/i, dataDetail);
  // const message = 'Link copiado!';

  return (
    <div className="card">
      {recipeImage(url, title)}
      {recipeTitle(title)}
      {recipeShare(pathname)}
      {recipeCategory(category)}
      {recipeIngredients(ingredients, measures)}
      {recipeInstructions(instructions)}
      {recipeVideo(video)}
      {recipeStart(start, history, pathname)}
    </div>
  );
}

export default RecipeDetail;
