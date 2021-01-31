import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FlexContainer from '../components/FlexContainer';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import { getCocktailById } from '../services/cocktailAPI';
import { getMealsRecommendations } from '../services/mealAPI';
import Recommendations from '../components/Recommendations';

function CocktailDetails() {
  const history = useHistory();
  const [storeIngredients, setStoreIngredients] = useState([]);
  const [storeMeasures, setStoreMeasures] = useState([]);
  const [title, setTitle] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [instructions, setInstructions] = useState('');
  const [mealsRecommendations, setMealsRecommendations] = useState([]);

  const getRecipeId = () => {
    const path = history.location.pathname;
    const splitPath = path.split('/').splice(2, 1).toString();
    return splitPath;
  }

  useEffect(() => {
    getMealsRecommendations()
    .then((res) => setMealsRecommendations(res));
    const recipeId = getRecipeId();
    getCocktailById(recipeId)
    .then((res) => {
      const ingredientsArray = [];
      const measureArray = [];
      setTitle(res.drinks[0].strDrink);
      setSource(res.drinks[0].strDrinkThumb);
      setCategory(res.drinks[0].strAlcoholic);
      setInstructions(res.drinks[0].strInstructions);
      Object.entries(res.drinks[0]).forEach(([key, value]) => {
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
        if (value) {
          return (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              { `${key} - ${value}` }
            </li>
          )
        } else {
          return (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              { `${key}` }
            </li>
          )
        }
      })}
      </ul>
      <h3>Instruções</h3>
      <p data-testid="instructions">{ instructions }</p>
      <h3>Recomendações</h3>
      <Recommendations api={ mealsRecommendations } />  
      <button data-testid="start-recipe-btn">Iniciar Receita</button>
    </div>
  );
}

export default CocktailDetails;
