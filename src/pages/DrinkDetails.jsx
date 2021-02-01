import React, { useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from '../context/GlobalContext';
import likeIcon from '../images/whiteHeartIcon.svg';
import fullLikeIcon from '../images/blackHeartIcon.svg';
import ShareButton from '../components/ShareButton';
import './foodAndDrinkDetails.css';

export default function DrinkDetails(props) {
  const context = useContext(GlobalContext);
  const [btnTitle, setBtnTitle] = useState('Iniciar Receita');
  const [btnImg, setBtnImg] = useState('');
  const [recommendations1, setRecommendations1] = useState([]);
  const [recommendations2, setRecommendations2] = useState([]);
  const { getRecipeTitle, setRecipeTitle, getRecipeImage, setRecipeImage,
    getRecipeArea, getRecipeAlc, setRecipeAlc, getRecipeCategory, setRecipeCategory,
    getRecipeIngredients, setRecipeIngredients, getRecipeInstructions,
    setRecipeInstructions, recipesInProgress, setRecipesInProgress } = context;
  const { match, history: { location: { pathname } } } = props;
  const { params } = match;
  const { id } = params;
  const carouselActiveIndex = 0; // controla das recomendações
  const carouselPartition = 3;
  const buttonMount = () => {
    if (localStorage.getItem('doneRecipes') !== null) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      const findElement = doneRecipes.find((item) => item.id === id);
      if (findElement !== undefined) {
        return false;
      }
    }
    return true;
  };

  const saveFavoriteRecipe = () => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const favoriteRecipes = {
      id,
      type: 'bebida',
      area: getRecipeArea,
      category: getRecipeCategory,
      alcoholicOrNot: getRecipeAlc,
      name: getRecipeTitle,
      image: getRecipeImage,
    };
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    recipes.push(favoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
  };

  const unLikeRecipe = () => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const unSave = recipes.filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(unSave));
  };

  const handleImage = () => {
    if (btnImg === likeIcon) {
      setBtnImg(fullLikeIcon);
      saveFavoriteRecipe();
    } else {
      setBtnImg(likeIcon);
      unLikeRecipe();
    }
  };

  const handleClick = () => {
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      const inProgressRecipes = {
        cocktails: {
          [id]: [],
        },
        meals: {},
      };
      localStorage.setItem(
        'inProgressRec  ipes',
        JSON.stringify(inProgressRecipes),
      );
    } else {
      const previousObj = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const previousCocktails = previousObj.cocktails;
      const newCocktails = { ...previousCocktails, [id]: [] };
      const newObj = {
        ...previousObj,
        cocktails: newCocktails,
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
    }
    const path = `/bebidas/${id}/in-progress`;
    setRecipesInProgress(recipesInProgress.concat(id));
    props.history.push(path);
  };

  const ingredientsMount = useCallback(
    (value) => {
      const initialIndex = 0;
      const halfIndex = 2;
      const ingredients = Object.entries(value.drinks[0])
        .filter(
          (item) => item[0].includes('Ingredient') || item[0].includes('Measure'),
        )
        .filter(
          (amount) => amount[1] !== null && amount[1] !== ' ' && amount[1] !== '',
        )
        .map((ar2) => ar2[1]);
      const ingredientsMeasures = [];
      for (let i = initialIndex; i < ingredients.length / halfIndex; i += 1) {
        ingredientsMeasures.push(
          `${ingredients[i]} - ${ingredients[i + ingredients.length / halfIndex]}`,
        );
      }
      setRecipeIngredients(ingredientsMeasures);
    },
    [setRecipeIngredients],
  );

  const fetchDrinks = async () => {
    const path = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319';
    // const path = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(path);
    // console.log(response)
    const result = await response.json();
    // console.log(result);
    setRecipeTitle(result.drinks[0].strDrink);
    setRecipeCategory(result.drinks[0].strCategory);
    setRecipeAlc(result.drinks[0].strAlcoholic);
    setRecipeInstructions(result.drinks[0].strInstructions);
    setRecipeImage(result.drinks[0].strDrinkThumb);
    ingredientsMount(result);
  };

  const fetchRecommendations = useCallback(async () => {
    const path = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(path);
    const result = await response.json();
    // console.log(result);
    const maximumRecommendations1 = 3;
    const maximumRecommendations2 = 6;
    const getRecommendations1 = result.meals.filter(
      (recommendation, index) => index < maximumRecommendations1
        && recommendation,
    );
    // console.log(getRecommendations1);
    const getRecommendations2 = result.meals.filter(
      (recommendation, index) => index >= maximumRecommendations1
      && index < maximumRecommendations2
      && recommendation,
    );
    setRecommendations1(getRecommendations1);
    setRecommendations2(getRecommendations2);
  }, [setRecommendations1, setRecommendations2]);

  const setButtonTitle = () => {
    if (localStorage.getItem('inProgressRecipes') !== null) {
      const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
        .cocktails;
      const recipesIds = Object.keys(recipes);
      const findElement = recipesIds.find((recipeId) => recipeId === id);
      if (findElement !== undefined) {
        setBtnTitle('Continuar Receita');
      }
    }
  };

  const setLikeImage = () => {
    if (localStorage.getItem('favoriteRecipes') !== null) {
      const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const findElement = recipes.find((item) => item.id.toString() === id);
      if (findElement !== undefined) {
        setBtnImg(fullLikeIcon);
      } else {
        setBtnImg(likeIcon);
      }
    } else {
      setBtnImg(likeIcon);
    }
  };

  useEffect(() => {
    fetchDrinks();
    fetchRecommendations();
    setLikeImage();
    setButtonTitle();
  }, []);

  return (
    <div className="recipe-details-container">
      <img
        src={ getRecipeImage }
        alt={ getRecipeTitle }
        data-testid="recipe-photo"
        className="recipe-details-image"
      />
      <div>
        <p data-testid="recipe-title" className="recipe-details-name">
          { getRecipeTitle }
        </p>
        <div className="favorite-and-share-btn-container">
          <button type="button" onClick={ handleImage } className="favorite-btn">
            <img src={ btnImg } alt="like" data-testid="favorite-btn" />
          </button>
          <ShareButton path={ pathname } />
        </div>
      </div>
      <p className="recipe-details-category">
        Category-
        <span data-testid="recipe-category">{getRecipeAlc}</span>
      </p>
      <ul className="ingredients-list">
        {getRecipeIngredients.map((item, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {item}
          </li>
        ))}
      </ul>
      <h3 data-testid="instructions" className="recipe-details-instructions">
        {getRecipeInstructions}
      </h3>
      <h3>Recommendations:</h3>
      <div className="carousels-container">
        <div
          className="carousel slide w-25"
          data-ride="carousel"
          id="carousel1"
        >
          <div className="carousel-inner">
            {recommendations1.map((item, index) => {
              if (index === carouselActiveIndex) {
                // console.log(item); obj de cada bebida
                return (
                  <div
                    key={ item.idMeal }
                    data-testid={ `${index}-recomendation-card` }
                    className="carousel-item active"
                  >
                    <img
                      src={ item.strMealThumb }
                      alt={ item.strMeal }
                      className="d-block w-100"
                    />
                    <h5 data-testid={ `${index}-recomendation-title` }>
                      { item.strMeal }
                    </h5>
                  </div>
                );
              }
              return (
                <div
                  key={ item.idMeal }
                  data-testid={ `${index}-recomendation-card` }
                  className="carousel-item"
                >
                  <img
                    src={ item.strMealThumb }
                    alt={ item.strMeal }
                    className="d-block w-100"
                  />
                  <h5 data-testid={ `${index}-recomendation-title` }>
                    {item.strMeal}
                  </h5>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="carousel slide w-25"
          data-ride="carousel"
          id="carousel2"
        >
          <div className="carousel-inner">
            {recommendations2.map((item, index) => {
              if (index === carouselActiveIndex) {
                return (
                  <div
                    key={ item.idMeal }
                    data-testid={ `${
                      index + carouselPartition
                    }-recomendation-card` }
                    className="carousel-item active"
                  >
                    <img
                      src={ item.strMealThumb }
                      alt={ item.strMeal }
                      className="d-block w-100"
                    />
                    <h5
                      data-testid={ `${
                        index + carouselPartition
                      }-recomendation-title` }
                    >
                      { item.strMeal }
                    </h5>
                  </div>
                );
              }
              return (
                <div
                  key={ item.idMeal }
                  data-testid={ `${
                    index + carouselPartition
                  }-recomendation-card` }
                  className="carousel-item"
                >
                  <img
                    src={ item.strMealThumb }
                    alt={ item.strMeal }
                    className="d-block w-100"
                  />
                  <h5
                    data-testid={ `${
                      index + carouselPartition
                    }-recomendation-title` }
                  >
                    { item.strMeal }
                  </h5>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {buttonMount() && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          onClick={ handleClick }
        >
          {btnTitle}
        </button>
      )}
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }).isRequired,
};
