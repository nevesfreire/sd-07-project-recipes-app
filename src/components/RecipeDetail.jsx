import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import Card from './Card';

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

function RecipeDetail() {
  // useEffect(() => {
  //   const Newid = pathname.split('/')[2];
  //   console.log(Newid);
  // }, []);
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
      {recipeRecommendation(recommendation)}
    </div>
  );
}

export default RecipeDetail;
