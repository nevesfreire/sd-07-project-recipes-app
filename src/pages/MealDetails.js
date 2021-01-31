import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ImageBanner from '../components/ImageBanner';
import FlexContainer from '../components/FlexContainer';
import TitleLarge from '../components/TitleLarge';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import Subtitle from '../components/Subtitle';
import TitleMedium from '../components/TitleMedium';
import List from '../components/List';
import { getCocktailById } from '../services/cocktailAPI';
import { getMealById, getMealsRecommendations } from '../services/mealAPI';
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

  const getRecipeId = () => {
    const path = history.location.pathname;
    const splitPath = path.split('/').splice(2, 1).toString();
    return splitPath;
  }

  useEffect(() => {
    const recipeId = getRecipeId();
    getMealById(recipeId)
    .then((res) => {
      const ingredientsArray = [];
      const measureArray = [];
      Object.entries(res.meals[0]).forEach(([key, value]) => {
        const ingredients = key.startsWith('strIngredient') ? value : '';
        const measure = key.startsWith('strMeasure') ? value : '';
        if (ingredients.length > 1) {
          ingredientsArray.push(ingredients);
        }
        if (measure.length > 1) {
          measureArray.push(measure);
        }
      });
      setTitle(res.meals[0].strMeal);
      setSource(res.meals[0].strMealThumb);
      setVideo(res.meals[0].strYoutube);
      setCategory(res.meals[0].strCategory);
      setInstructions(res.meals[0].strInstructions);
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
      <ImageBanner
        data-testid="recipe-photo"
        src={ source }
        height="200px"
      />
      <FlexContainer>
        <TitleLarge data-testid="recipe-title">{ title }</TitleLarge>
        <FlexContainer>
          <ShareButton data-testid="share-btn" />
          <FavoriteButton data-testid="favorite-btn" />
        </FlexContainer>
      </FlexContainer>
      <Subtitle data-testid="recipe-category">{ category }</Subtitle>
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
        frameBorder="0"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        width="560"
        height="315"
        src={ videoUrl }
      />
      <h3>Recomendações</h3>
      <Recommendations />      
      <button data-testid="start-recipe-btn">Iniciar Receita</button>
    </div>
  );
}

export default MealDetails;
