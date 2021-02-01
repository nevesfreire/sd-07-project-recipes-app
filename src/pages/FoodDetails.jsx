import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from '../context/GlobalContext';
import likeIcon from '../images/whiteHeartIcon.svg';
import fullLikeIcon from '../images/blackHeartIcon.svg';
import ShareButton from '../components/ShareButton';
import './FoodDetails.css';
import {
  ingredientsMount,
  buttonMount,
  videoMount,
  setButtonTitle,
  unLikeRecipe,
  setLikeImage,
  saveFavoriteRecipe,
  fetchRecommendations,
  // handleImage,
} from '../components/func_details';

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
    videoMount(setRecipeVideo, result);
    ingredientsMount(setRecipeIngredients, result);
  };

  const handleImage = () => {
    if (btnImg === likeIcon) {
      setBtnImg(fullLikeIcon);
      saveFavoriteRecipe(
        id,
        getRecipeArea,
        getRecipeCategory,
        getRecipeTitle,
        getRecipeImage,
      );
    } else {
      setBtnImg(likeIcon);
      unLikeRecipe(id);
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

  useEffect(() => {
    setTitle('Food Details');
    fetchRecipe();
    fetchRecommendations(setRecommendations1, setRecommendations2);
    setButtonTitle(setBtnTitle, id);
    setLikeImage(setBtnImg, id, fullLikeIcon, likeIcon);
  }, []);

  return (
    <div className="recipe-details-container">
      <img
        src={ getRecipeImage }
        alt={ getRecipeTitle }
        data-testid="recipe-photo"
        className="recipe-details-image"
      />
      <p data-testid="recipe-title" className="recipe-details-name">
        { getRecipeTitle }
      </p>
      <div className="favorite-and-share-btn-container">
        <button
          type="button"
          onClick={ handleImage }
          className="favorite-btn"
        >
          <img src={ btnImg } alt="like" data-testid="favorite-btn" />
        </button>
        <ShareButton path={ pathname } />
      </div>
      <p className="recipe-details-category">
        Category-
        <span data-testid="recipe-category">{ getRecipeCategory }</span>
      </p>
      <ul className="ingredients-list">
        { getRecipeIngredients.map((item, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            { item }
          </li>
        )) }
      </ul>
      <h3 data-testid="instructions" className="recipe-details-instructions">
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
            { recommendations1.map((item, index) => {
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
                  data-testid={ `${
                    index + carouselActiveIndex1
                  }-recomendation-card` }
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
            }) }
          </div>
        </div>
        <div
          className="carousel slide w-25"
          data-ride="carousel"
          id="carousel2"
        >
          <div className="carousel-inner">
            { recommendations2.map((item, index) => {
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
                      data-testid={ `${
                        index + carouselPartition
                      }-recomendation-title` }
                    >
                      {item.strDrink}
                    </h5>
                  </div>
                );
              }
              return (
                <div
                  key={ item.idDrink }
                  data-testid={ `${
                    index + carouselPartition
                  }-recomendation-card` }
                  className="carousel-item"
                >
                  <img
                    src={ item.strDrinkThumb }
                    alt={ item.strDrink }
                    className="d-block w-100"
                  />
                  <h5
                    data-testid={ `${
                      index + carouselPartition
                    }-recomendation-title` }
                  >
                    { item.strDrink }
                  </h5>
                </div>
              );
            }) }
          </div>
        </div>
      </div>
      {buttonMount(id) && (
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
