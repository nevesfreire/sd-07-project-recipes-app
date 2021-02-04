import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../Context/Context';
import useFetch from '../hooks/useFetch';
import RecomendationCardMeal from '../components/RecomendationCardMeal';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import detailsDidMount from '../components/DetailsDidMount';
import '../css/Button.css';

function DetailsMeal() {
  const { detailsRecipe, mealStateButton } = useContext(RecipeContext);
  const [loading, setLoading] = useState(true);
  const { recipeDetailsAPI } = useFetch();
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const [spanHidden, setSpanHidden] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const url = document.URL;
  const newUrlId = url.split('/')[4];
  const newUrlType = url.split('/')[3];

  useEffect(() => {
    recipeDetailsAPI(newUrlId, newUrlType)
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return (<div>Loading...</div>);
  }

  const { strCategory,
    strMeal,
    strMealThumb,
    strYoutube,
    strInstructions,
    idMeal,
    strArea,
  } = detailsRecipe.meals[0];

  const currentRecipe = {
    name: strMeal,
  };
  // verifica se a página já carrega como favorito
  detailsDidMount(buttonClicked, favoriteRecipe, setFavoriteRecipe, currentRecipe);

  const allRecipe = Object.entries(detailsRecipe.meals[0]);
  const ingredients = allRecipe.filter(
    (ingredient) => (ingredient[0].includes('strIngredient') && ingredient[1] !== ''),
  );
  const measures = allRecipe.filter(
    (measure) => (measure[0].includes('strMeasure') && measure[1] !== ' '),
  );

  const meal = detailsRecipe.meals[0];
  const keysMeal = Object.keys(meal);
  const filterMeal = keysMeal
    .filter((key) => key.toLowerCase().includes('ingredient'));
  const filterMeasure = keysMeal
    .filter((key) => key.toLowerCase().includes('measure'));
  const allIngredients = filterMeal
    .map((item, index) => ({
      ingredient: meal[item], measure: meal[filterMeasure[index]],
    })).filter((item) => item.ingredient !== '' && item.ingredient !== null);

  function copyToClipBoard(text) {
    navigator.clipboard.writeText(text);
    setSpanHidden(true);
  }

  function handleFavorite() {
    setButtonClicked(true);
    const newRecipe = {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    if (favoriteRecipe === false) {
      setFavoriteRecipe(true);
      if (localStorage.getItem('favoriteRecipes') === null) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([newRecipe]));
      } else {
        const favoriteLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
        const newFavoriteList = [
          ...favoriteLocalStorage,
          newRecipe,
        ];
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify(newFavoriteList),
        );
      }
    }
    if (favoriteRecipe === true) {
      setFavoriteRecipe(false);
      const favoriteLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const newListFavorite = favoriteLocalStorage
        .filter((recipe) => recipe.name !== newRecipe.name);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newListFavorite));
    }
  }

  return (
    <div>
      <img src={ strMealThumb } data-testid="recipe-photo" alt={ strMeal } />
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <button
        onClick={ () => copyToClipBoard(document.URL) }
        type="button"
      >
        <img
          src={ shareIcon }
          alt="icone de coração, para favoritar receita"
          data-testid="share-btn"
        />
      </button>
      <span hidden={ !spanHidden }>Link copiado!</span>
      <button onClick={ handleFavorite } type="button">
        <img
          src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
          alt="icone de coração, para favoritar receita"
          data-testid="favorite-btn"
        />
      </button>
      <p data-testid="recipe-category">{strCategory}</p>
      <ul>
        {
          allIngredients && allIngredients.map((item, index) => (
            <li key={ item } data-testid={ `${index}-ingredient-name-and-measure` }>
              {
                `${index + 1} - ${item.ingredient}: ${item.measure}`
              }
            </li>))
        }
      </ul>
      <p data-testid="instructions">{strInstructions}</p>
      <video data-testid="video" width="100">
        <source src={ strYoutube } type="video/mp4" />
        <track default kind="captions" srcLang="en" src={ strYoutube } />
      </video>

      <RecomendationCardMeal />
      <br />
      { mealStateButton && (
        <Link to={ `/comidas/${newUrlId}/in-progress` }>
          <button
            className="buttn-bottom"
            type="button"
            data-testid="start-recipe-btn"
          >
            Iniciar receita
          </button>
        </Link>
      )}

    </div>
  );
}

export default DetailsMeal;
