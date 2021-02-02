import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Provider';
import Carousel from '../../components/Carousel';
import { fetchDetails } from '../../services/api';
import { getItem, saveItem, initialize } from '../../services/localStorage';
import './style.css';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function Details({ history, match }) {
  const { results } = useContext(Context);
  const [renderButton, setRenderButton] = useState(false);
  const [showCopiedMessage, setCopiedMessage] = useState('hidden');
  const [favoriteRecipes, setFavoriteRecipes] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const [detailData, setDetailData] = useState({
    id: '',
    name: '',
    src: '',
    category: '',
    instructions: '',
    ingredients: [],
    video: '',
    alcoholic: '',
    area: '',
  });
  const { id } = match.params;
  const { pathname } = history.location;

  useEffect(() => {
    if (!getItem('user')) initialize();
    
    const favoriteRecipesArray = getItem('favoriteRecipes') || [];
    const getPathNameId = pathname.split('/')[2];

    const isRecipeFavorite = favoriteRecipesArray.some(recipe => recipe.id === getPathNameId);
    if (isRecipeFavorite) setFavoriteRecipes(true);
    else setFavoriteRecipes(false);

    const doneRecipes = getItem('doneRecipes');
    const isDone = doneRecipes.some(recipe => recipe.id === getPathNameId);
    if (isDone) setRenderButton(false);
    else setRenderButton(true);

    const inProgress = getItem('inProgressRecipes');
    const field = pathname.includes('comidas') ? 'meals' : 'cocktails';
    const isProgress = Object.keys(inProgress[field]).some((id) => getPathNameId);
    if (isProgress) setInProgress(true);
    else setInProgress(false);
  }, []);

  useEffect(() => {
    const getIngredientsList = (list) => {
      const ingredients = Object.entries(list).reduce(getIngredients, []);
      const measures = Object.entries(list).reduce(getMeasures, []);

      const ingredientsList = [];

      ingredients.forEach((_, index) => {
        ingredientsList.push(`${ingredients[index]} - ${measures[index]}`);
      })

      return ingredientsList;
    }

    const getIngredients = (acc, curr) => {
      return curr[0].includes('strIngredient')
        && curr[1] !== ''
        && curr[1] !== null
        ? [...acc, curr[1]] : acc;
    };

    const getMeasures = (acc, curr) => {
      return curr[0].includes('strMeasure')
        && curr[1] !== ''
        && curr[1] !== null
        ? [...acc, curr[1]] : acc;
    };

    const fetchData = async () => {
      const api = pathname.includes('comidas') ? 'meal' : 'drink';
      const data = await fetchDetails(id, api);
      setDetailData({
        id: data.idMeal || data.idDrink,
        name: data.strMeal || data.strDrink,
        src: data.strMealThumb || data.strDrinkThumb,
        category: data.strCategory,
        instructions: data.strInstructions,
        video: data.strYoutube || '',
        ingredients: getIngredientsList(data),
        alcoholic: data.strAlcoholic,
        area: data.strArea,
      });
    };

    if (!results.lenght) fetchData();
    else {
      setDetailData({
        id: results[id].idMeal || results[id].idDrink,
        name: results[id].strMeal || results[id].strDrink,
        src: results[id].strMealThumb || results[id].strDrinkThumb,
        category: results[id].strCategory,
        instructions: results[id].strInstructions,
        video: results[id].strYoutube || '',
        ingredients: getIngredientsList(results[id]),
        alcoholic: results[id].strAlcoholic,
        area: results[id].strArea,
      });
    }
  }, []);

  const newDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    return today = mm + '/' + dd + '/' + yyyy;
  }

  const beginRecipe = () => {
    const doneRecipesArray = getItem('doneRecipes');
    detailData.doneDate = newDate();
    doneRecipesArray.push(detailData);
    const getPathType = pathname.split('/')[1];
    let inProgressRecipesObjects = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getPathType === 'comidas') {
      inProgressRecipesObjects.meals = { ...inProgressRecipesObjects.meals, [detailData.id]: [] }
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipesObjects))
    } else {
      inProgressRecipesObjects.cocktails = { ...inProgressRecipesObjects.cocktails, [detailData.id]: [] }
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipesObjects))
    }
  }

  const renderFavorite = () => {
    return favoriteRecipes;
    // const arrayString = localStorage.getItem('favoriteRecipes');
    // if (!arrayString) {
    //   return (false);
    // }
    // const favoriteRecipesArray = JSON.parse(arrayString);
    // const favoriteRecipesArray = getItem('favoriteRecipes') || [];
    // const getPathNameId = pathname.split('/')[2];
    // const isRecipeFavorite = favoriteRecipesArray.some(recipe => recipe.id === getPathNameId);
    // if (isRecipeFavorite) {
    //   return true;
    // } else {
    //   return false;
    // }
  }

  const checkInProgress = () => {
    // const getPathNameId = pathname.split('/')[2];
    // const field = pathname.includes('comidas') ? 'meals' : 'cocktails';
    // const inProgress = getItem('inProgressRecipes');
    // const isProgress = Object.keys(inProgress[field]).some((id) => getPathNameId);
    // if (isProgress) return true;
    return false;
  }

  const button = () => {
    return (
      <Link to={`${pathname}/in-progress`}>
        {!renderButton && (
          <button
            className="button"
            data-testid="start-recipe-btn"
            onClick={ inProgress ? null : () => beginRecipe(detailData)}
          >
            {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
          </button>
        )}
      </Link>
    );
  }

  const copy = require('clipboard-copy');

  const copyLink = () => {
    const twoSecondes = 2000;
    const getUrl = window.location.href;
    copy(getUrl);
    setCopiedMessage('');
    setTimeout(() => { setCopiedMessage('hidden'); }, twoSecondes);
  };

  const setAsFavorite = () => {
    const favoriteRecipesArray = getItem('favoriteRecipes');

    const getPathNameId = pathname.split('/')[2];
    const isRecipeFavorite = favoriteRecipesArray.some(recipe => recipe.id === getPathNameId);

    let drinkOrMeal = "";
    let alcoholic = '';

    if (pathname.split('/')[1] === 'comidas') {
      drinkOrMeal = 'comida';
    } else {
      drinkOrMeal = 'bebida';
    };

    if (detailData.alcoholic) {
      alcoholic = 'Alcoholic';
    }

    const objFavorite = {
      id: detailData.id,
      type: drinkOrMeal,
      area: detailData.area || "",
      category: detailData.category,
      alcoholicOrNot: alcoholic,
      name: detailData.name,
      image: detailData.src,
    };

    if (!isRecipeFavorite) {
      // setFavoriteRecipes(true);
      favoriteRecipesArray.push(objFavorite);
      // localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesArray));
    } else {
      let index = favoriteRecipesArray.map(recipe => {
        return recipe.id;
      }).indexOf(getPathNameId);
      // setFavoriteRecipes(false);
      favoriteRecipesArray.splice(index, 1);
      // localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesArray));
    }
    saveItem('favoriteRecipes', favoriteRecipesArray);
    setFavoriteRecipes((prev) => !prev);
  }

  useEffect(() => {
    try {
      const renderBeginRecipeButton = () => {
        const doneRecipesArray = JSON.parse(localStorage.getItem('doneRecipes'));
        const getPathNameId = pathname.split('/')[2];
        const recipeInDoneRecipe = doneRecipesArray.some(recipe => recipe.id === getPathNameId);
        if (recipeInDoneRecipe) {
          setRenderButton(true);
        } else {
          setRenderButton(false);
        }
      }
      renderBeginRecipeButton();
    } catch (e) {
      return e;
    }

    // try {
    //   const renderFavoriteIcon = () => {
    //     const favoriteRecipesArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
    //     const getPathNameId = pathname.split('/')[2];
    //     const isRecipeFavorite = favoriteRecipesArray.some(recipe => recipe.id === getPathNameId);
    //     if (!favoriteRecipesArray || favoriteRecipesArray.lenght === 0) {
    //       // setFavoriteRecipes(false);
    //     }
    //     else if (isRecipeFavorite) {
    //       // setFavoriteRecipes(true);
    //     } else {
    //       // setFavoriteRecipes(false);
    //     }
    //   }
    //   renderFavoriteIcon();
    // } catch (e) {
    //   return e;
    // }
  }, []);

  const { name, src, category, instructions, video, ingredients, alcoholic } = detailData;

  return (
    <article>
      <header>
        <main>
          <p data-testid="recipe-title">{name}</p>
        </main>
        <img
          data-testid="recipe-photo"
          alt="thumbnail"
          src={src}
          width="100px"
        />
        <p data-testid="recipe-category">
          {category}

          {alcoholic && ' | Alcoholic'}
        </p>
        <p data-testid="instructions">
          {instructions}
        </p>
        <ul>
          {ingredients.map((ing, index) => (
            <li
              key={ing}
              data-testid={`${index}-ingredient-name-and-measure`}
            >
              {ing}
            </li>
          ))}
        </ul>
        <video
          width="200"
          height="200"
          controls
          data-testid="video"
          src={video}
        >
          <source src={video} type="video/mp4" />
        </video>
      </header>
      <section>
        <ul>
          <li>
            <button
              data-testid="share-btn"
              onClick={() => copyLink()}
            >
              Compartilhar
            </button>
          </li>
          <li>
            <button
              data-testid="favorite-btn"
              type="button"
              onClick={() => setAsFavorite()}
            >
              <img
                src={renderFavorite() ? blackHeartIcon : whiteHeartIcon}
                alt="heartIcon"
              />
              Favoritar
            </button>
          </li>
          <li>
            {button()}
          </li>
          <p hidden={showCopiedMessage}>Link copiado!</p>
        </ul>
      </section>
      <Carousel history={history} />
    </article>
  );
}

export default Details;
