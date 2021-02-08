import React, { useContext, useEffect, useState } from 'react';

import { Carousel } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import ShareButton from '../components/DetailsComponents/ShareButton';
import FavButton from '../components/DetailsComponents/FavButton';
import StartButton from '../components/DetailsComponents/StartButton';

export default function FoodDetails() {
  const [recomendations, setRecomendations] = useState([]);

  const {
    recipe,
    setRecipe,
    // favorited,
    // setFavorited,
  } = useContext(RecipesContext);

  const history = useHistory();
  const zero = 0;
  const cinco = 5;
  const seis = 6;
  const path = history.location.pathname;
  const listIngredients = [];

  useEffect(() => {
    const getRecipe = async () => {
      const id = path.substr(path.length - cinco, path.length);
      const endpoint = (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { meals } = await fetch(endpoint).then((response) => response.json());
      setRecipe(meals[0]);
    };
    getRecipe();
  }, [path, setRecipe]);

  const getRecomendations = async () => {
    const endpoint = ('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const { drinks } = await fetch(endpoint).then((response) => response.json());
    const sixCards = drinks.slice(zero, seis);
    setRecomendations(sixCards);
  };

  const ingredientsList = () => {
    const vinte = 20;
    for (let i = 1; i <= vinte; i += 1) {
      if (recipe[`strIngredient${i}`] !== null && recipe[`strIngredient${i}`] !== '') {
        listIngredients
          .push(`${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`);
      }
    }
    return true;
  };

  // const isFavorite = () => {
  //   if (!favorited.includes(recipe.idMeal)) {
  //     setFavorited([recipe.idMeal, ...favorited]);
  //     const dataMeal = JSON.parse(localStorage.getItem('favoriteRecipes'))
  //       ? JSON.parse(localStorage.getItem('favoriteRecipes'))
  //       : [];
  //     localStorage.setItem('favoriteRecipes', JSON.stringify([...dataMeal, {
  //       id: recipe.idMeal,
  //       type: 'comida',
  //       area: recipe.strArea,
  //       category: recipe.strCategory,
  //       alcoholicOrNot: '',
  //       name: recipe.strMeal,
  //       image: recipe.strMealThumb,
  //     }]));
  //   } else {
  //     setFavorited(favorited.filter((item) => recipe.idMeal !== item));
  //     const dataMeal = JSON.parse(localStorage.getItem('favoriteRecipes'))
  //       ? JSON.parse(localStorage.getItem('favoriteRecipes'))
  //       : [];
  //     const newDataMeal = dataMeal.filter((item) => recipe.idMeal !== item.id);
  //     localStorage.setItem('favoriteRecipes', JSON.stringify(newDataMeal));
  //   }
  // };

  useEffect(() => {
    getRecomendations();
  }, []);

  useEffect(() => {
    const dataFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (dataFav) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...dataFav]));
    } else { localStorage.setItem('favoriteRecipes', JSON.stringify([])); }

    const dataDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if (dataDone) {
      localStorage.setItem('doneRecipes', JSON.stringify([...dataDone]));
    } else { localStorage.setItem('doneRecipes', JSON.stringify([])); }
    localStorage.setItem('doneRecipes', JSON.stringify([]));
  }, []);

  return (
    <div>

      <img
        data-testid="recipe-photo"
        alt="Foto da Receita"
        src={ recipe.strMealThumb }
      />

      <h2 data-testid="recipe-title">{recipe.strMeal}</h2>

      <h4 data-testid="recipe-category">{recipe.strCategory}</h4>

      <h3>Ingredientes</h3>
      { ingredientsList() }
      <ul>
        {listIngredients.map((ingredients, key) => (
          <li
            key={ key }
            data-testid={ `${key}-ingredient-name-and-measure` }
          >
            {ingredients}
          </li>))}
      </ul>

      <h3>Instruções</h3>
      <span data-testid="instructions">{recipe.strInstructions}</span>

      <ShareButton />
      <FavButton />

      <h3>Video</h3>
      <iframe
        data-testid="video"
        className="width360"
        title="video"
        src={ recipe.strYoutube && recipe.strYoutube.replace('watch?v=', 'embed/') }
        frameBorder="0"
        allow="accelerometer; autoplay;
            clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      <h3>Recomendadas</h3>

      <Carousel>

        {recomendations.map((item, index) => (

          <Carousel.Item
            key={ item.idDrink }
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              className="d-block w-100"
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
            />
            <Carousel.Caption>
              <h3
                data-testid={ `${index}-recomendation-title` }
              >
                {item.strDrink}
              </h3>
              <h4>{item.strAlcoholic}</h4>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <StartButton />

    </div>
  );
}
