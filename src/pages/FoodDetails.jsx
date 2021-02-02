import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from '../context/GlobalContext';
import likeIcon from '../images/whiteHeartIcon.svg';
import fullLikeIcon from '../images/blackHeartIcon.svg';
import ShareButton from '../components/ShareButton';
import ShowRecommended from '../components/RecommendedFoodOrDrinks';
import './foodAndDrinkDetails.css';
import {
  ingredientsMount,
  buttonMount,
  videoMount,
  setButtonTitle,
  unLikeRecipe,
  setLikeImage,
  saveFavoriteRecipe,
  fetchRecommendations,
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
  // console.log(id)
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
    const options = {
      id,
      getRecipeArea,
      getRecipeCategory,
      getRecipeTitle,
      getRecipeImage,
    };
    if (btnImg === likeIcon) {
      setBtnImg(fullLikeIcon);
      saveFavoriteRecipe(options);
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
        <button type="button" onClick={ handleImage } className="favorite-btn">
          <img src={ btnImg } alt="like" data-testid="favorite-btn" />
        </button>
        <ShareButton path={ pathname } />
      </div>
      <p className="recipe-details-category">
        Category-
        <span data-testid="recipe-category">{getRecipeCategory}</span>
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
      <iframe
        src={ getRecipeVideo }
        title={ getRecipeTitle }
        data-testid="video"
        className="recipe-details-video"
      />
      <h3>Recommendations:</h3>
      <ShowRecommended
        recommendation1={ recommendations1 }
        recommendation2={ recommendations2 }
        carouselActiveIndex={ carouselActiveIndex }
        carouselActiveIndex1={ carouselActiveIndex1 }
        carouselPartition={ carouselPartition }
      />
      {buttonMount(id) && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          onClick={ handleClick }
        >
          { btnTitle }
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
