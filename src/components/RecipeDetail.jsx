import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import context from '../contextAPI/context';
import { fetchApi, getFoodRecipeId, getDrinkRecipeId } from '../services/fetchApi';
// import shareIcon from '../images/shareIcon.svg';
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

const fetchId = async (pathname, id, setState) => {
  console.log(pathname, id, 'achou um consolelog');
  if (pathname === `/comidas/${id}`) {
    const newData = await fetchApi(getFoodRecipeId(id));
    console.log(newData, 'dentro');
    setState((s) => ({
      ...s,
      data: newData.meals,
      recipeStr: 'strMeal',
    }));
  } else if (pathname === `/bebidas/${id}`) {
    const newData = await fetchApi(getDrinkRecipeId(id));
    console.log(newData, 'dentro');
    setState((s) => ({
      ...s,
      data: newData.drinks,
      recipeStr: 'strDrink',
    }));
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

// const recipeShare = (functionShare, message) => (
//   <div>
//     <button
//       data-testid="share-btn"
//       onClick={ functionShare }
//       type="button"
//     >
//       <img
//         src={ shareIcon }
//         alt="share"
//       />
//     </button>
//     <div>
//       {message}
//     </div>
//   </div>
// );

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

// const recipeStart = (funcStart) => (
//   <button
//     data-testid="start-recipe-btn"
//     type="button"
//     onClick={ funcStart }
//   >
//     Iniciar Receita
//   </button>
// );

// async function share(pathname, message) {
//   navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
//   message = 'Link copiado!';
//   return message;
// }

// function start() {
//   console.log('COMEÇA A RECEITA');
// }

function RecipeDetail() {
  const { state, setState } = useContext(context);
  const location = useLocation();
  const { pathname } = location;
  const { data, recipeStr } = state;

  useEffect(() => {
    const Newid = pathname.split('/')[2];
    fetchId(pathname, Newid, setState);
    console.log(Newid);
  }, [pathname, setState]);

  if (!data) return <div>Loading...</div>;
  const idData = data[0];
  const url = idData[findMatch(/Thumb/, idData)];
  const title = idData[findMatch(recipeStr, idData)];
  const category = idData[findMatch(/category/i, idData)];
  const instructions = idData[findMatch(/instructions/i, idData)];
  const video = idData[findMatch(/youtube/i, idData)];
  const ingredients = Object.entries(idData)
    .filter((entrie) => {
      if (entrie[0].match(/ingredient/i) && entrie[1] !== (null || '' || 'null')) {
        return entrie[1];
      }
      return false;
    }).map((entrie) => entrie[1]);
  const measures = Object.entries(idData)
    .filter((entrie) => {
      if (entrie[0].match(/measure/i) && entrie[1] !== (null || '' || 'null')) {
        return entrie[1];
      }
      return false;
    }).map((entrie) => entrie[1]);

  return (
    <div className="card">
      {recipeImage(url, title)}
      {recipeTitle(title)}
      {/* {recipeShare(share, message)} */}
      {recipeCategory(category)}
      {recipeIngredients(ingredients, measures)}
      {recipeInstructions(instructions)}
      {recipeVideo(video)}
    </div>
  );
}

export default RecipeDetail;
