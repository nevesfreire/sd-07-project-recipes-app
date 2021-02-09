import React, { useContext, useEffect, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import Card from './Card';
import { fetchApi, getFoodRecipeId, getDrinkRecipeId } from '../services/fetchApi';
import context from '../contextAPI/context';

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

const recipeShare = (functionShare, message) => (
  <div>
    <button
      data-testid="share-btn"
      onClick={ functionShare }
      type="button"
    >
      <img
        src={ shareIcon }
        alt="share"
      />
    </button>
    <div>
      {message}
    </div>
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
        dta-testid={ `${index}-ingredient-name-and-measure` }
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

<<<<<<< HEAD
const recipeRecommendation = (recommendation) => (
  recommendation.map((recommend, index) => (
    <Card
      key={ recommend[findMatch('id', recommend)] }
      pathname={ pathname }
      id={ recommend[findMatch('id', recommend)] }
      Name={ recommend[findMatch(recipeStr, recommend)] }
      Thumb={ recommend[findMatch(/Thumb/, recommend)] }
      Index={ index }
      Test="recomendation-card"
    />
  ))
);
=======
const findMatch = (string, object) => (
  Object.keys(object).find((key) => key.match(string))
);

// const recipeRecommendation = (recommendation) => {
//   return (
//     recommendation.map((recommend, index) => (
//       <Card
//         key={ recommend[findMatch('id', recommend)] }
//         pathname={ pathname }
//         id={ recommend[findMatch('id', recommend)] }
//         Name={ recommend[findMatch(recipeStr, recommend)] }
//         Thumb={ recommend[findMatch(/Thumb/, recommend)] }
//         Index={ index }
//         data-testid={ `${index}-recomendation-card` }
//       />
//     ))
//   );
// };
>>>>>>> 732173a12af89e88ab47510231792829704414fe

const recipeStart = (funcStart) => (
  <button
    data-testid="start-recipe-btn"
    type="button"
    onClick={ funcStart }
  >
    Iniciar Receita
  </button>
);

async function share(pathname, message) {
  navigator.clipboard.writeText(`http://localhost:300${pathname}`);
  message = 'Link copiado!';
  return message;
}

function start() {
  console.log('COMEÇA A RECEITA');
}

const newFunc = async (pathname, setRecipe, setRecipeStr) => {
  if (pathname.match('/comidas')) {
    const id = pathname.split('/')[2];
    console.log(id);
    const data = await fetchApi(getFoodRecipeId(id));
    console.log(data);
    const { meal } = data;
    setRecipe(meal);
    setRecipeStr('strMeal');
  } else if (pathname.match('/')) {
    const id = pathname.split('/')[2];
    const data = await fetchApi(getDrinkRecipeId(id));
    const { drink } = data;
    setRecipeStr('strDrink');
    setRecipe(drink);
  }
};

function RecipeDetail() {
  const { state } = useContext(context);
  const [recipe, setRecipe] = useState();
  const [recipeStr, setRecipeStr] = useState();
  useEffect(() => {
    newFunc(pathname, setRecipe, setRecipeStr);
  }, [pathname, setRecipe, setRecipeStr]);

  // const { data } = state;

  const url = recipe[findMatch('Thumb', recipe)];
  const title = recipe[findMatch(recipeStr, recipe)];
  const category = recipe[findMatch('category', recipe)];
  // ingredients: ,
  // measures: ,
  const instructions = recipe[findMatch('Instructions', recipe)];
  const video = recipe[findMatch('Youtube', recipe)];

  return (
    <div>
      <div className="card">
        {recipeImage(url, title)}
        {recipeTitle(tilte)}
        {recipeShare(share, message)}
        {recipeCategory(category)}
        {recipeIngredients(ingredients, measures)}
        {recipeInstructions(instructions)}
        {recipeVideo(video)}
        {recipeStart(start)}
      </div>
      {/* {recipeRecommendation(recommendation)} */}
    </div>
  );
}

export default RecipeDetail;
