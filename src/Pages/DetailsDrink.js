import React, { useContext, useEffect, useState } from 'react';
import RecipeContext from '../Context/Context';
import useFetch from '../hooks/useFetch';
import RecomendationCardDrinks from '../components/RecomendationCardDrinks';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DetailsDrink() {
  const { detailsRecipe } = useContext(RecipeContext);
  const [loading, setLoading] = useState(true);
  const { recipeDetailsAPI } = useFetch();
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const [spanHidden, setSpanHidden] = useState(false);

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
    idDrink,
    srtArea,
    strDrink,
    strDrinkThumb,
    strAlcoholic,
    strYoutube,
    strInstructions,
  } = detailsRecipe.drinks[0];

  const allRecipe = Object.entries(detailsRecipe.drinks[0]);
  console.log('allrceipes', detailsRecipe.drinks[0]);
  const ingredients = allRecipe.filter(
    (ingredient) => (ingredient[0].includes('strIngredient') && ingredient[1] !== ''),
  );
  const measures = allRecipe.filter(
    (measure) => (measure[0].includes('strMeasure') && measure[1] !== ' '),
  );

  function copyToClipBoard(text) {
    navigator.clipboard.writeText(text);
    setSpanHidden(true);
  }

  function handleFavorite() {
    const newRecipe = {
      id: idDrink,
      type: 'bebida',
      area: srtArea,
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
    if (favoriteRecipe === false) {
      setFavoriteRecipe(true);
      if (localStorage.getItem('favoriteRecipes') === null) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([newRecipe]));
      } else {
        const favoriteLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
        console.log('favLS', favoriteLocalStorage);
        const newFavoriteList = {
          ...favoriteLocalStorage,
          ...newRecipe,
        };
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([newFavoriteList]),
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
      <img src={ strDrinkThumb } data-testid="recipe-photo" alt={ strDrink } />
      <h1 data-testid="recipe-title">{strDrink}</h1>
      <button
        aria-label="shareIcon"
        data-testid="share-btn"
        onClick={ () => copyToClipBoard(document.URL) }
        type="button"
      />
      <span hidden={ !spanHidden }>Link copiado!</span>
      {/* <div
        aria-label="shareIcon"
        tabIndex={ 0 }
        src={ shareIcon }
        data-testid="share-btn"
        onClick={ () => copyURL() }
        role="button"
        onKeyDown={ copyURL }
      /> */}
      <button
        aria-label="favoriteIcon"
        tabIndex={ 0 }
        src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
        data-testid="favorite-btn"
        onClick={ handleFavorite }
        type="button"
        onKeyDown={ handleFavorite }
      />
      <p data-testid="recipe-category">{strCategory}</p>
      <p data-testid="recipe-category">{strAlcoholic}</p>
      <ul>
        {
          ingredients && measures && ingredients.map((ingredient, index) => (
            <li key={ ingredient } data-testid={ `${index}-ingredient-name-and-measure` }>
              {measures[index][1]}
              of
              { ingredient[1] }
            </li>))
        }
      </ul>
      <p data-testid="instructions">{strInstructions}</p>
      <video data-testid="video" width="100">
        <source src={ strYoutube } type="video/mp4" />
        <track default kind="captions" srcLang="en" src={ strYoutube } />
      </video>
      <RecomendationCardDrinks />
      <button type="button" data-testid="start-recipe-btn">Iniciar receita</button>
    </div>
  );
}

export default DetailsDrink;
