import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FlexContainer from '../components/FlexContainer';
import { getMealById } from '../services/mealAPI';
import { getCocktailsRecommendations } from '../services/cocktailAPI';
import Recommendations from '../components/Recommendations';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function MealDetails() {
  const history = useHistory();
  const [recipeId, setRecipeId] = useState('');
  const [heartStatus, setHeartStatus] = useState('');
  const [copyLink, setCopyLink] = useState(false);
  const [storeIngredients, setStoreIngredients] = useState([]);
  const [storeMeasures, setStoreMeasures] = useState([]);
  const [title, setTitle] = useState('');
  const [source, setSource] = useState('');
  const [video, setVideo] = useState('');
  const [category, setCategory] = useState('');
  const [area, setArea] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cocktailsRecommendations, setCocktailsRecommendations] = useState([]);
  /* const [disabled, enableButton] = useState('false'); */

  const handleClick = () => {
    history.push(`/comidas/${recipeId}/in-progress`);
  }

  const handleAction = ({ target }) => {
    const copy = require('clipboard-copy');
    const getType = target.getAttribute('data-type');
    if (getType === 'share') {
      copy(history.location.pathname)
      .then(setCopyLink(true));
    } else {
      if (heartStatus === 'white') {
        setHeartStatus('black');
        const addNewRecipe = {
          id: recipeId,
          type: 'comida',
          area,
          category,
          alcoholicOrNot: '',
          name: title,
          image: source,
        };
        const getStatus = JSON.parse(localStorage.getItem('favoriteRecipes'));
        const myRecipes = [...getStatus, addNewRecipe];
        localStorage.removeItem('favoriteRecipes');
        localStorage.setItem('favoriteRecipes', JSON.stringify(myRecipes));
      } else {
        setHeartStatus('white');
        const getStatus = JSON.parse(localStorage.getItem('favoriteRecipes'));
        const returned = getStatus.filter((recipe) => recipe.id !== recipeId);
        localStorage.removeItem('favoriteRecipes');
        localStorage.setItem('favoriteRecipes', JSON.stringify(returned));
      }
    }
  }

  const checkStatus = () => {
    const getStatus = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!getStatus) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      setHeartStatus('white');
    } else {
      const path = history.location.pathname;
      const splitPath = path.split('/').splice(2, 1).toString();
      const returnId = getStatus.find((recipe) => recipe.id === splitPath);
      if (returnId) {
        setHeartStatus('black');
      } else {
        setHeartStatus('white');
      }
    }
  }

  useEffect(() => {
    const path = history.location.pathname;
    const splitPath = path.split('/').splice(2, 1).toString();
    setRecipeId(splitPath);
    checkStatus();
    getCocktailsRecommendations()
    .then((res) => setCocktailsRecommendations(res));
     getMealById(splitPath)
    .then((res) => {
      const ingredientsArray = [];
      const measureArray = [];
      setTitle(res.meals[0].strMeal);
      setSource(res.meals[0].strMealThumb);
      setVideo(res.meals[0].strYoutube);
      setCategory(res.meals[0].strCategory);
      setArea(res.meals[0].strArea);
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
        
        { copyLink === true ? (<span>Link copiado!</span>) : false }
        <input
          data-type="share"
          data-testid="share-btn"
          type="image"
          src={ shareIcon }
          onClick={ handleAction }
        />
        <input
          data-type="favorite"
          data-testid="favorite-btn"
          type="image"
          src={ heartStatus === 'white' ?  whiteHeartIcon : blackHeartIcon }
          onClick={ handleAction }
        />
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
      
      <button
        className="startRecipe"
        data-testid="start-recipe-btn"
        /* disabled={ disabled } */
        onClick={ handleClick }
      >
        Iniciar Receita
      </button>
    
    </div>
  );
}

export default MealDetails;
