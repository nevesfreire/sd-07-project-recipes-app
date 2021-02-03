import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import likeIcon from '../../images/whiteHeartIcon.svg';
import likeIconBlack from '../../images/blackHeartIcon.svg';
// import FoodIngredients from '../../Pages/FoodIngredientsPage';
import RecipeContext from '../../Context/RecipeContext';
import RecomendationCard from '../RecomedationCard';
import { fetchAllCocktails } from '../../API/apiCocktails';

const RecipeDetail = () => {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isStart, setIsStart] = useState(false);

  const {
    state: { cocktailsData, categoryFilterDrinks },
    dispatch,
  } = useContext(RecipeContext);
  const size = 0;
  const { id } = useParams();
  const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  const like = () => {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([{ favoriteRecipes: `${id}` }]),
    );

    if (isFavorite === false) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
      localStorage.removeItem('favoriteRecipes');
    }
  };

  useEffect(() => {
    const checkFavorite = () => {
      const favoriteLocalStorage = JSON.parse(
        localStorage.getItem('favoriteRecipes'),
      );
      if (favoriteLocalStorage !== null) {
        const ocurrencies = favoriteLocalStorage.map((actual) => Object.entries(actual));
        const isFavored = ocurrencies.map(
          (actualItem, index) => actualItem[index][1].includes(id),
        );
        if (isFavored[0] === true) {
          setIsFavorite(true);
        }
      }
    };

    checkFavorite();
  }, [id]);

  useEffect(() => {
    const getAPI = async () => {
      const response = await fetch(endPoint);
      const recipeDetail = await response.json();
      return recipeDetail;
    };

    getAPI().then((resolve) => setRecipeDetails(resolve));

    fetchAllCocktails('', categoryFilterDrinks, 's').then((arrayLimit) => dispatch({
      type: 'SET_COCKTAILS',
      data: arrayLimit,
    }));
  }, [endPoint, recipeDetails, id, dispatch, categoryFilterDrinks]);

  if (recipeDetails.length === size) {
    return <h1>loading...</h1>;
  }

  const ingredients = (data) => {
    const entries = Object.entries(data);
    const ingr = entries.filter(
      (acc) => acc[0].includes('strIngredient') && acc[1] !== '' && acc[1] !== null,
    );
    const quant = entries.filter(
      (acc) => acc[0].includes('strMeasure')
        && acc[1] !== ''
        && acc[1] !== ' '
        && acc[1] !== null,
    );

    return ingr.map((acc, index) => (
      <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
        {`${acc[1]}: ${quant[index][1]}`}
      </li>
    ));
  };

  const page = 'comida';
  const sizeEnd = 6;
  // const mealsSixData = mealsData.slice(size, sizeEnd);

  // console.log(mealsSixData);

  const mealsSave = cocktailsData;

  const mealsDoc = () => mealsSave
    .slice(size, sizeEnd)
    .map(({ strDrinkThumb, strDrink, idDrink }, index) => (
      <RecomendationCard
        data-testid={ `${index}-recomendation-card` }
        idFood={ idDrink }
        page={ page }
        key={ strDrink }
        index={ index }
        foodName={ strDrink }
        thumb={ strDrinkThumb }
      />
    ));

  const startRecipe = () => {
    setIsStart(true);
  };

  const shareLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    const cont = document.getElementById('result');
    cont.innerHTML = 'Link copiado!';
  };

  return (
    <div className="containerInt">
      <div className="recipe-image">
        <img
          src={ recipeDetails.meals[0].strMealThumb }
          alt="thumbNail"
          data-testid="recipe-photo"
        />
      </div>
      <div className="container-title ">
        <h2 className="recipe-title" data-testid="recipe-title">
          {recipeDetails.meals[0].strMeal}
        </h2>
        <button type="button" onClick={ () => like() }>
          <img
            data-testid="favorite-btn"
            src={ isFavorite === false ? likeIcon : likeIconBlack }
            alt="favorite"
          />
        </button>
        <button
          data-testid="share-btn"
          type="button"
          onClick={ () => shareLink() }
        >
          <img src={ shareIcon } alt="share" />
        </button>
        <span id="result" />
      </div>
      <div className="container-text">
        <div className="category" data-testid="recipe-category">
          {recipeDetails.meals[0].strCategory}
        </div>
        <div className="ingredient">
          <h3>Ingredients</h3>
          {ingredients(recipeDetails.meals[0])}
        </div>
        <div className="instructions" data-testid="instructions">
          <h3>Modo de preparo</h3>
          {recipeDetails.meals[0].strInstructions}
        </div>
      </div>
      <div className="container-video">
        <div className="video" data-testid="video">
          <iframe
            title="youtube"
            width="360"
            height="315"
            src={ recipeDetails.meals[0].strYoutube }
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
      <div className="container-cards">{mealsDoc()}</div>
      <Link to={ `/comidas/${id}/in-progress` }>
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

export default RecipeDetail;
