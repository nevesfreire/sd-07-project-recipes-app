import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../Context/Context';
import useFetch from '../hooks/useFetch';
import RecomendationCardDrinks from '../components/RecomendationCardDrinks';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import detailsDidMount from '../components/DetailsDidMount';
import '../css/Button.css';

function DetailsDrink() {
  const { detailsRecipe, drinkStateButton } = useContext(RecipeContext);
  const [loading, setLoading] = useState(true);
  const { recipeDetailsAPI } = useFetch();
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const [spanHidden, setSpanHidden] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const url = document.URL;
  const newUrlId = url.split('/')[4];
  const newUrlType = url.split('/')[3];
  // const localStorageRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  // const lengthIngredients = localStorageRecipes.cocktails[newUrlId].length
  // console.log('loalstorage',localStorageRecipes.cocktails[newUrlId].length)
  // console.log('ingredientes',detailsRecipe.drinks[0])

  useEffect(() => {
    recipeDetailsAPI(newUrlId, newUrlType)
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return (<div>Loading...</div>);
  }

  // function getLengthOfIngredients() {
  //   const localStorageRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   if (localStorageRecipes.cocktails[newUrlId].length === undefined) {
  //     return 0
  //   }
  //   return localStorageRecipes.cocktails[newUrlId].length
  // }

  const { strCategory,
    idDrink,
    strDrink,
    strDrinkThumb,
    strAlcoholic,
    strYoutube,
    strInstructions,
  } = detailsRecipe.drinks[0];

  const currentRecipe = {
    name: strDrink,
  };
  // verifica se a página já carrega como favorito
  detailsDidMount(buttonClicked, favoriteRecipe, setFavoriteRecipe, currentRecipe);

  const allRecipe = Object.entries(detailsRecipe.drinks[0]);
  console.log('allrceipes', detailsRecipe.drinks[0]);
  const ingredients = allRecipe.filter(
    (ingredient) => (ingredient[0].includes('strIngredient') && ingredient[1] !== ''),
  );
  const measures = allRecipe.filter(
    (measure) => (measure[0].includes('strMeasure') && measure[1] !== ' '),
  );

  const drink = detailsRecipe.drinks[0];
  const keysDrink = Object.keys(drink);
  const filterDrink = keysDrink
    .filter((key) => key.toLowerCase().includes('ingredient'));
  const filterMeasure = keysDrink.filter((key) => key
    .toLowerCase().includes('measure'));
  const allIngredients = filterDrink
    .map((item, index) => ({
      ingredient: drink[item], measure: drink[filterMeasure[index]],
    })).filter((item) => item.ingredient !== '' && item.ingredient !== null);

  function copyToClipBoard(text) {
    navigator.clipboard.writeText(text);
    setSpanHidden(true);
  }

  function handleFavorite() {
    setButtonClicked(true);
    const newRecipe = {
      id: idDrink,
      type: 'bebida',
      area: '',
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
      <p data-testid="recipe-category">{strAlcoholic}</p>
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

      <RecomendationCardDrinks />
      <br />
      { drinkStateButton && (
        <Link to={ `/bebidas/${newUrlId}/in-progress` }>
          <button
            className="buttn-bottom"
            type="button"
            data-testid="start-recipe-btn"
          >
            Iniciar receita
          </button>
        </Link>
      )}
      {/* { getLengthOfIngredients() > 0
      ? drinkStateButton && <Link to={ `/bebidas/${newUrlId}/in-progress` }>
        <button className="buttn-bottom" type="button" data-testid="start-recipe-btn">Iniciar receita</button>
      </Link>
      : drinkStateButton && <Link to={ `/bebidas/${newUrlId}/in-progress` }>
      <button className="buttn-bottom" type="button" data-testid="start-recipe-btn">Continuar Receita</button>
    </Link> } */}
    </div>
  );
}

export default DetailsDrink;
