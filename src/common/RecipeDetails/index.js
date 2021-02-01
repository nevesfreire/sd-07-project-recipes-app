import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './style.css';
import { mealById, drinkById, mealRecomendations, drinkRecomendations } from '../../services/API';

const RecipeDetails = () => {
  const history = useHistory();
  const [mainContent, setMainContent] = useState({});
  const [typeRecipe, setTypeRecipe] = useState('meal');
  const [recomen, setRecomen] = useState([]);
  const { id } = useParams();

  
  useEffect(() => {
    const getData = async () => {
      if (typeRecipe === 'meal') {
        const data = await mealById(id);
        setMainContent(data.meals[0]);
        const recomendations = await mealRecomendations();
        setRecomen(recomendations.drinks);
      } else {
        const data = await drinkById(id);
        setMainContent(data.drinks[0]);
        const recomendations = await drinkRecomendations();
        setRecomen(recomendations.meals);
      }
    };
    getData();
  }, [id, typeRecipe]);
  
  

  const { strMealThumb: thumbRecipe, strMeal: nameRecipe, strCategory, strInstructions } = mainContent;
  const ingredients = Object.keys(mainContent).filter((e) => e.includes('strIngredient'));
  const measures = Object.keys(mainContent).filter((e) => e.includes('strMeasure'));
  const recomendations = recomen.map((e) => e.strDrink).slice(0, 6);
  console.log(typeRecipe);
  if (typeRecipe !== 'meal') {
    const { strDrinkThumb: thumbRecipe, strDrink: nameRecipe, strCategory, strInstructions } = mainContent;
    const ingredients = Object.keys(mainContent).filter((e) => e.includes('strIngredient'));
    const measures = Object.keys(mainContent).filter((e) => e.includes('strMeasure'));
    const recomendations = recomen.map((e) => e.strMeal).slice(0, 6);
  }

  if (mainContent) {
    return (
      <div>
        <img
          src={thumbRecipe}
          alt="meal"
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{nameRecipe}</h1>
        <button
          type="button"
          data-testid="share-btn"
        >
          compartilhar
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          favoritar
        </button>
        <p data-testid="recipe-category">{strCategory}</p>
        <p data-testid="instructions">{strInstructions}</p>
        <h2>Ingredientes:</h2>
        <ol>
          {ingredients.map((e, i) => <li data-testid={`${i}-ingredient-name-and-measure`} key={i}>{mainContent[e]}</li>)}
        </ol>
        <ol>
          {measures.map((e, i) => <li data-testid={`${i}-ingredient-name-and-measure`} key={i}>{mainContent[e]}</li>)}
        </ol>
        <iframe
          title="video"
          data-testid="video"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/vaZb1MnFBgA"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <button
          onClick={() => history.push(`/comidas/${id}/in-progress`)}
          className="startRecipe"
          type="button"
          data-testid="start-recipe-btn"
        >
          iniciar receita
        </button>
        <ol className="recomendations">
          {recomendations.map((e, i) => (
            <li data-testid={`${i}-recomendation-card`} key={i}>
              <p data-testid={`${i}-recomendation-title`}>{e}</p>
            </li>))}
        </ol>
      </div>
    );
  }
  return <h1>carregando...</h1>;
};

export default RecipeDetails;
