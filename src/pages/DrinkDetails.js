import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';
import { fetchAPI, handleIngredients,
  TWO_THOUSAND, SIX, TWENTY_ONE, THIRTY_SIX, FIFTY_ONE } from '../services/helpers';
import '../style/recipeDetail.css';

function DrinkDetails() {
  const [recipeDetailDrink, setRecipeDetailDrink] = useState({});
  const [recommendation, setRecommendation] = useState(['']);
  const [copyText, setCopyText] = useState('');
  const [favorited, setFavorited] = useState();
  const history = useHistory();
  const { pathname } = history.location;
  const drinkRecipeId = pathname.split('/')[2];

  const {
    setDrinkRecipeId,
    setMealRecipeId,
  } = useContext(RecipesContext);

  useEffect(() => {
    const getAPI = async () => {
      const drink = await fetchAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkRecipeId}`);
      const recipeDrink = await drink.drinks;
      setRecipeDetailDrink(recipeDrink[0]);
      setDrinkRecipeId(drinkRecipeId);
    };
    getAPI();
  }, [drinkRecipeId, setDrinkRecipeId, setRecipeDetailDrink]);

  useEffect(() => {
    const fetchRecommendation = async () => {
      const foods = await fetchAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const foodsData = await foods.meals;
      setRecommendation(foodsData);
    };
    fetchRecommendation();
  }, []);

  const handleCopyClick = () => {
    copy(window.location.href);
    setCopyText('Link copiado!');
    setInterval(() => setCopyText(''), TWO_THOUSAND);
  };

  useEffect(() => {
    if (!localStorage.favoriteRecipes) {
      localStorage.favoriteRecipes = JSON.stringify([]);
    }
    const favoriteStorage = JSON.parse(localStorage.favoriteRecipes)
      .filter((item) => item.id === drinkRecipeId);
    if (favoriteStorage.length >= 1) {
      setFavorited(blackHeartIcon);
    } else {
      setFavorited(whiteHeartIcon);
    }
  }, [drinkRecipeId]);

  const handleFavoriteClick = () => {
    if (favorited === whiteHeartIcon) {
      setFavorited(blackHeartIcon);
      const favoriteFood = {
        id: recipeDetailDrink.idDrink,
        type: 'bebida',
        area: '',
        category: recipeDetailDrink.strCategory,
        alcoholicOrNot: recipeDetailDrink.strAlcoholic,
        name: recipeDetailDrink.strDrink,
        image: recipeDetailDrink.strDrinkThumb,
      };
      const recipes = JSON.parse(localStorage.favoriteRecipes);
      const AllFavorites = recipes.concat(favoriteFood);
      localStorage.favoriteRecipes = JSON.stringify(AllFavorites);
    } else {
      setFavorited(whiteHeartIcon);
      const recipes = JSON.parse(localStorage.favoriteRecipes);
      const AllFavorites = recipes.filter((recipe) => recipe.id !== drinkRecipeId);
      localStorage.favoriteRecipes = JSON.stringify(AllFavorites);
    }
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        width="500"
        src={ recipeDetailDrink.strDrinkThumb }
        alt="drink"
      />
      <h2 data-testid="recipe-title">{recipeDetailDrink.strDrink}</h2>
      <button type="button" onClick={ handleCopyClick }>
        <img data-testid="share-btn" src={ shareIcon } alt="share" />
      </button>
      <button type="button" onClick={ handleFavoriteClick }>
        <img data-testid="favorite-btn" src={ favorited } alt="favorite" />
      </button>
      <p>{copyText}</p>
      <p data-testid="recipe-category">{recipeDetailDrink.strAlcoholic}</p>
      <ul>
        {handleIngredients(recipeDetailDrink, TWENTY_ONE, THIRTY_SIX, FIFTY_ONE)}
      </ul>
      <p data-testid="instructions">{recipeDetailDrink.strInstructions}</p>
      <div>
        {
          recommendation && recommendation.length && recommendation
            .filter((_, indexs) => indexs < SIX)
            .map((meals, index) => (
              <div
                data-testid={ `${index}-recomendation-card` }
                key="index"
              >
                <Link
                  onClick={ () => setMealRecipeId(meals.idMeal) }
                  to={ `/comidas/${meals.idMeal}` }
                  key={ index }
                >
                  <img
                    width="200"
                    data-testid={ `${index}-card-img` }
                    src={ meals.strMealThumb }
                    alt={ meals.strMeal }
                  />
                </Link>
                <p
                  data-testid={ `${index}-recomendation-title` }
                >
                  {meals.strMeal}
                </p>
              </div>
            ))
        }
      </div>
      <Link to={ `/bebidas/${drinkRecipeId}/in-progress` }>
        <button
          className="fixedbutton"
          type="button"
          data-testid="start-recipe-btn"
        >
          Start Recipe
        </button>
      </Link>
    </div>
  );
}

export default DrinkDetails;
