import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
// import { element } from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import likeIcon from '../../images/whiteHeartIcon.svg';
import likeIconBlack from '../../images/blackHeartIcon.svg';
// import FoodIngredients from '../../Pages/FoodIngredientsPage';
import RecipeContext from '../../Context/RecipeContext';
import RecomendationCard from '../RecomedationCard';
import { fetchAllRecipes } from '../../API/apiMeals';

const RecipeDetailDrink = () => {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isStart, setIsStart] = useState(true);
  const {
    state: { mealsData, categoryFilterMeals },
    dispatch,
  } = useContext(RecipeContext);
  const size = 0;
  const { id } = useParams();
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  const like = () => {
    localStorage.setItem('favoriteRecipesDrinks', JSON.stringify(`${id}`));
    if (isFavorite === false) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
      localStorage.removeItem('favoriteRecipesDrinks');
    }
  };

  useEffect(() => {
    const storageRecipes = localStorage.getItem('doneRecipes');
    const jsonRecipes = storageRecipes === null ? [] : JSON.parse(storageRecipes);
    const isStartRecipe = jsonRecipes.some((recipe) => recipe.id === id);
    if (isStartRecipe) {
      setIsStart(true);
    } else {
      setIsStart(false);
    }
  }, [id]);

  useEffect(() => {
    const getAPI = async () => {
      const response = await fetch(endPoint);
      const recipeDetail = await response.json();
      return recipeDetail;
    };

    getAPI().then((resolve) => setRecipeDetails(resolve));

    fetchAllRecipes('', categoryFilterMeals).then((arrayLimit) => dispatch({
      type: 'SET_MEALS',
      data: arrayLimit,
    }));
  }, [endPoint, recipeDetails, id, dispatch, categoryFilterMeals]);

  if (recipeDetails.length === size) {
    return <h1>loading...</h1>;
  }

  const ingredients = (data) => {
    const entries = Object.entries(data);

    const ingr = entries.filter(
      (acc) => acc[0].includes('strIngredient') && acc[1] !== '' && acc[1] !== null,
    );

    const quant = entries
      .filter((acc) => acc[0].includes('strMeasure'))
      .slice(size, ingr.length);

    return ingr.map((acc, index) => (
      <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
        {`${acc[1]}: ${quant[index][1] === null ? '' : quant[index][1]}`}
      </li>
    ));
  };

  const page = 'comida';
  const sizeEnd = 6;
  // const mealsSixData = mealsData.slice(size, sizeEnd);
  // console.log(mealsSixData);

  const mealsSave = mealsData;

  const mealsDoc = () => mealsSave
    .slice(size, sizeEnd)
    .map(({ strMealThumb, strMeal, idMeal }, index) => (
      <RecomendationCard
        data-testid={ `${index}-recomendation-title` }
        idFood={ idMeal }
        page={ page }
        key={ strMeal }
        index={ index }
        foodName={ strMeal }
        thumb={ strMealThumb }
      />
    ));

  const startRecipe = () => {
    setIsStart(true);
  };

  // const isDoneRecipe = () => {
  //   const isDone = JSON.parse(localStorage.getItem('doneRecipes'));
  //   if (isDone && id !== isDone.id) {
  //     return (
  //       <button
  //         className="btn-start"
  //         data-testid="start-recipe-btn"
  //         type="button"
  //         onClick={ () => startRecipe() }
  //       >
  //         {isStart === true ? 'Continuar Receita' : 'Iniciar Receita'}
  //       </button>
  //     );
  //   }
  // };

  const shareLink = () => {
    const url = window.location.href;
    console.log(url);
    navigator.clipboard.writeText(url);
    const cont = document.getElementById('result');
    cont.innerHTML = 'Link copiado!';
  };
  return (
    <div className="containerInt">
      <div className="recipe-image">
        <img
          src={ recipeDetails.drinks[0].strDrinkThumb }
          alt="thumbNail"
          data-testid="recipe-photo"
        />
      </div>
      <div className="container-title ">
        <h2 className="recipe-title" data-testid="recipe-title">
          {recipeDetails.drinks[0].strDrink}
        </h2>
        <button data-testid="favorite-btn" type="button" onClick={ () => like() }>
          <img
            src={ isFavorite === false ? likeIcon : likeIconBlack }
            alt="favorite"
          />
        </button>
        <button data-testid="share-btn" type="button" onClick={ () => shareLink() }>
          <img src={ shareIcon } alt="share" />
          <span id="result" />
        </button>

      </div>
      <div className="container-text">
        <div className="category" data-testid="recipe-category">
          {recipeDetails.drinks[0].strAlcoholic}
        </div>
        <div className="ingredient">
          <h3>Ingredients</h3>
          {ingredients(recipeDetails.drinks[0])}
        </div>
        <div className="instructions" data-testid="instructions">
          <h3>Modo de preparo</h3>
          {recipeDetails.drinks[0].strInstructions}
        </div>
      </div>
      <div className="container-video">
        <div className="video" data-testid="video" />
      </div>
      <div className="container-cards">{mealsDoc()}</div>
      {/* {isDoneRecipe()} */}
      <Link to={ `/bebidas/${id}/in-progress` }>
        <button
          className="btn-start"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => startRecipe() }
        >
          {isStart === true ? 'Continuar Receita' : 'Iniciar Receita'}
        </button>
      </Link>
    </div>
  );
};

export default RecipeDetailDrink;
