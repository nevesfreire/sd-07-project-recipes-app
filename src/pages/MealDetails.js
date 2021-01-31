import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FlexContainer from '../components/FlexContainer';
import TitleLarge from '../components/TitleLarge';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import Subtitle from '../components/Subtitle';
import { getCocktailById } from '../services/cocktailAPI';
import { getMealById } from '../services/mealAPI';
import { getCocktailsRecommendations } from '../services/cocktailAPI';
import Recommendations from '../components/Recommendations';

function MealDetails() {
  const history = useHistory();
  const [storeIngredients, setStoreIngredients] = useState([]);
  const [storeMeasures, setStoreMeasures] = useState([]);
  const [title, setTitle] = useState('');
  const [source, setSource] = useState('');
  const [video, setVideo] = useState('');
  const [category, setCategory] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cocktailsRecommendations, setCocktailsRecommendations] = useState([]);

  const getRecipeId = () => {
    const path = history.location.pathname;
    const splitPath = path.split('/').splice(2, 1).toString();
    return splitPath;
  }

  useEffect(() => {
    getCocktailsRecommendations()
    .then((res) => setCocktailsRecommendations(res));
    const recipeId = getRecipeId();
    getMealById(recipeId)
    .then((res) => {
      const ingredientsArray = [];
      const measureArray = [];
      setTitle(res.meals[0].strMeal);
      setSource(res.meals[0].strMealThumb);
      setVideo(res.meals[0].strYoutube);
      setCategory(res.meals[0].strCategory);
      setInstructions(res.meals[0].strInstructions);
      Object.entries(res.meals[0]).forEach(([key, value]) => {
        const ingredients = key.startsWith('strIngredient') ? value : 0;
        const measure = key.startsWith('strMeasure') ? value : 0;
        if (ingredients !== 0 && ingredients !== null && ingredients.length > 1) {
          ingredientsArray.push(ingredients);
        }
        if (measure !== 0) {
          measureArray.push(measure);
        }
      });
      setStoreIngredients(...storeIngredients, ingredientsArray);
      setStoreMeasures(...storeMeasures, measureArray);
    });
  }, []);

  const getTogether = storeIngredients.map((ingredient, index) => {
    return { [ingredient]: storeMeasures[index] }
  })
  const videoUrl = video.replace("watch?v=", "embed/");

  return (
    <div className="meal-details-page">
      <img
        data-testid="recipe-photo"
        src={ source }
        height="200px"
      />
      <FlexContainer>
        <h1 data-testid="recipe-title">{ title }</h1>
        <FlexContainer>
          <ShareButton data-testid="share-btn" />
          <FavoriteButton data-testid="favorite-btn" />
        </FlexContainer>
      </FlexContainer>
      <h3 data-testid="recipe-category">{ category }</h3>
      <h3>Ingredientes</h3>
      <ul>{ getTogether.map((element, index) => {
        const [ key ] = Object.keys(element);
        const [ value ] = Object.values(element);
        return (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            { `${key} - ${value}` }
          </li>
        )
      })}
      </ul>
      <h3>Instruções</h3>
      <p data-testid="instructions">{ instructions }</p>
      <h3>Vídeo</h3>
      <iframe
        data-testid="video"
        frameBorder="0"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        width="560"
        height="315"
        src={ videoUrl }
      />
      <h3>Recomendações</h3>
      <Recommendations api={ cocktailsRecommendations } />  
      <button data-testid="start-recipe-btn">Iniciar Receita</button>
    </div>
  );
}

export default MealDetails;
