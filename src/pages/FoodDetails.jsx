import React, { useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from '../context/GlobalContext';
import likeIcon from '../images/whiteHeartIcon.svg';
import fullLikeIcon from '../images/blackHeartIcon.svg';
import ShareButton from '../components/ShareButton';
import './FoodDetails.css';

export default function FoodDetails(props) {
  const context = useContext(GlobalContext);
  const [btnTitle, setBtnTitle] = useState('Iniciar Receita');
  const [btnImg, setBtnImg] = useState('');
  const [recommendations1, setRecommendations1] = useState([]);
  const [recommendations2, setRecommendations2] = useState([]);

  const { getRecipeTitle, setRecipeTitle, getRecipeImage, setRecipeImage, getRecipeArea,
    setRecipeArea, getRecipeCategory, setRecipeCategory, getRecipeIngredients,
    setRecipeIngredients, getRecipeInstructions, setRecipeInstructions, getRecipeVideo,
    setRecipeVideo, recipesInProgress, setRecipesInProgress, setTitle } = context;
  const { match, history: { location: { pathname } } } = props;
  const { params } = match;
  const { id } = params;
  const carouselActiveIndex = 0;
  const carouselActiveIndex1 = 1;
  const carouselPartition = 3;

  const ingredientsMount = useCallback(
    (value) => {
      const initialIndex = 0;
      const halfIndex = 2; // importante para pegar o valor das quantidades
      const ingredients = Object.entries(value.meals[0])
        // console.log(ingredients); array 2 chave e valor do retorno da API
        .filter((item) => item[0].includes('Ingredient') || item[0].includes('Measure'))
        // console.log(ingredients); trazendo igrediente + quantidade
        // está trazendo algumas linhas de array vazio
        .filter((amount) => amount[1] !== null && amount[1] !== ' ' && amount[1] !== '')
        // console.log(ingredients) todos arrays sem vazios
        .map((ar2) => ar2[1]);
      // console.log(ingredients)
      const ingredientsMeasures = [];
      for (let i = initialIndex; i < ingredients.length / halfIndex; i += 1) {
        ingredientsMeasures.push(
          `${ingredients[i]} - ${ingredients[i + ingredients.length / halfIndex]}`,
        );
      }
      // console.log(ingredientsMeasures) // concatenação de igredientes e quantidades
      setRecipeIngredients(ingredientsMeasures);
    }, [setRecipeIngredients],
  );

  const videoMount = (value) => {
    // console.log(value.meals[0].strYoutube)
    const lastIndex = value.meals[0].strYoutube.lastIndexOf('=');
    // console.log(lastIndex)
    const videoId = value.meals[0].strYoutube.slice(lastIndex + 1);
    // console.log(videoId) capturando idVideo
    const newVideoPath = `https://www.youtube.com/embed/${videoId}`;
    setRecipeVideo(newVideoPath);
  };

  const fetchRecipe = async () => {
    const path = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771';
    // const path = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const getRecipe = await fetch(path);
    const result = await getRecipe.json();
    // console.log(result); chave meals interesse
    setRecipeTitle(result.meals[0].strMeal);
    setRecipeCategory(result.meals[0].strCategory);
    setRecipeImage(result.meals[0].strMealThumb);
    setRecipeInstructions(result.meals[0].strInstructions);
    setRecipeArea(result.meals[0].strArea);
    videoMount(result);
    ingredientsMount(result);
  };

  const fetchRecommendations = async () => {
    const path = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const getRecipe = await fetch(path);
    const result = await getRecipe.json();
    // console.log(result) chave drinks é o interesse
    const maximumRecommendations1 = 3;
    const maximumRecommendations2 = 6;
    const getRecommendations1 = result.drinks.filter(
      (recommendation, index) => (index < maximumRecommendations1 && recommendation),
    );
    const getRecommendations2 = result.drinks.filter(
      (recommendation, index) => (
        index >= maximumRecommendations1
        && index < maximumRecommendations2
        && recommendation
      ),
    );

    setRecommendations1(getRecommendations1);
    setRecommendations2(getRecommendations2);
  };

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

  const setButtonTitle = () => {
    if (localStorage.getItem('inProgressRecipes') !== null) {
      const recipes = JSON.parse(localStorage.getItem('inProgressRecipes')).meals;
      const recipesIds = Object.keys(recipes);
      const findElement = recipesIds.find((recipeId) => recipeId === id);
      if (findElement !== undefined) {
        setBtnTitle('Continuar Receita');
      }
    }
  };

  const unLikeRecipe = () => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const unSave = recipes.filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(unSave));
  };

  const saveFavoriteRecipe = () => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const favoriteRecipes = {
      id,
      type: 'comida',
      area: getRecipeArea,
      category: getRecipeCategory,
      alcoholicOrNot: '',
      name: getRecipeTitle,
      image: getRecipeImage,
    };
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    recipes.push(favoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
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
        meals: {
          [id]: [],
        },
        cocktails: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    } else {
      const previousObj = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const previousMeals = previousObj.meals;
      const newMeals = { ...previousMeals, [id]: [] };
      const newObj = {
        ...previousObj,
        meals: newMeals,
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
    }
    const path = `/comidas/${id}/in-progress`;
    setRecipesInProgress(recipesInProgress.concat(id));
    props.history.push(path);
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
    setTitle('Food Details');
    fetchRecipe();
    fetchRecommendations();
    setButtonTitle();
    setLikeImage();
  }, []);

  return (
    <div className="recipe-details-container">
      <img
        src={ getRecipeImage }
        alt={ getRecipeTitle }
        data-testid="recipe-photo"
        className="recipe-details-image"
      />
      <p
        data-testid="recipe-title"
        className="recipe-details-name"
      >
        { getRecipeTitle }
      </p>
      <div className="favorite-and-share-btn-container">
        <button
          type="button"
          onClick={ handleImage }
          className="favorite-btn"
        >
          <img
            src={ btnImg }
            alt="like"
            data-testid="favorite-btn"
          />
        </button>
        <ShareButton path={ pathname } />
      </div>
      <p className="recipe-details-category">
        Category-
        <span data-testid="recipe-category">
          { getRecipeCategory }
        </span>
      </p>
      <ul className="ingredients-list">
        {getRecipeIngredients.map((item, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {item}
          </li>
        ))}
      </ul>
      <h3
        data-testid="instructions"
        className="recipe-details-instructions"
      >
        { getRecipeInstructions }
      </h3>
      <iframe
        src={ getRecipeVideo }
        title={ getRecipeTitle }
        data-testid="video"
        className="recipe-details-video"
      />
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
                return (
                  <div
                    key={ item.strDrink }
                    data-testid={ `${index}-recomendation-card` }
                    className="carousel-item active"
                  >
                    <img
                      src={ item.strDrinkThumb }
                      alt={ item.strDrink }
                      className="d-block w-100"
                    />
                    <h5 data-testid={ `${index}-recomendation-title` }>
                      { item.strDrink }
                    </h5>
                  </div>
                );
              }
              return (
                <div
                  key={ item.idDrink }
                  data-testid={ `${index + carouselActiveIndex1}-recomendation-card` }
                  className="carousel-item"
                >
                  <img
                    src={ item.strDrinkThumb }
                    alt={ item.strDrink }
                    className="d-block w-100"
                  />
                  <h5 data-testid={ `${index}-recomendation-title` }>
                    { item.strDrink }
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
                    key={ item.idDrink }
                    data-testid="1-recomendation-card"
                    className="carousel-item active"
                  >
                    <img
                      src={ item.strDrinkThumb }
                      alt={ item.strDrink }
                      className="d-block w-100"
                    />
                    <h5
                      data-testid={ `${index + carouselPartition}-recomendation-title` }
                    >
                      { item.strDrink }
                    </h5>
                  </div>
                );
              }
              return (
                <div
                  key={ item.idDrink }
                  data-testid={ `${index + carouselPartition}-recomendation-card` }
                  className="carousel-item"
                >
                  <img
                    src={ item.strDrinkThumb }
                    alt={ item.strDrink }
                    className="d-block w-100"
                  />
                  <h5 data-testid={ `${index + carouselPartition}-recomendation-title` }>
                    { item.strDrink }
                  </h5>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {
        buttonMount() && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
            onClick={ handleClick }
          >
            {btnTitle}
          </button>
        )
      }
    </div>
  );
}

FoodDetails.propTypes = {
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
