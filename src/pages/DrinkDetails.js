import React, { useContext, useEffect, useState } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import FavButton from '../components/DetailsComponents/FavButton';
import ShareButton from '../components/DetailsComponents/ShareButton';

export default function DrinkDetails() {
  const [recomendations, setRecomendations] = useState([]);
  const {
    recipe,
    setRecipe,
  } = useContext(RecipesContext);

  const history = useHistory();
  const zero = 0;
  const cinco = 5;
  const seis = 6;
  const quinze = 15;
  const path = history.location.pathname;
  const listIngredients = [];

  useEffect(() => {
    const getRecipe = async () => {
      const id = path.length === quinze ? path.substr(path.length - seis, path.length)
        : path.substr(path.length - cinco, path.length);
      const endpoint = (`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { drinks } = await fetch(endpoint).then((response) => response.json());
      setRecipe(drinks[0]);
    };
    getRecipe();
  }, [path, setRecipe]);

  const getRecomendations = async () => {
    const endpoint = ('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const { meals } = await fetch(endpoint).then((response) => response.json());
    const sixCards = meals.slice(zero, seis);
    setRecomendations(sixCards);
  };

  const ingredientsList = () => {
    for (let i = 1; i <= quinze; i += 1) {
      if (recipe[`strIngredient${i}`] !== null && recipe[`strIngredient${i}`] !== '') {
        listIngredients
          .push(`${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`);
      }
    }
    return true;
  };

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

  const handleStartRecipeBtn = () => {
    history.push(`/bebidas/${recipe.idDrink}/in-progress`);
  };

  return (
    <div>

      <img
        data-testid="recipe-photo"
        alt="Foto da Receita"
        src={ recipe.strDrinkThumb }
      />

      <h2 data-testid="recipe-title">{recipe.strDrink}</h2>
      <h4 data-testid="recipe-category">{recipe.strAlcoholic}</h4>

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

      <h3>Recomendadas</h3>

      <Carousel>

        {recomendations.map((item, index) => (

          <Carousel.Item
            key={ item.idMeal }
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              className="d-block w-100"
              src={ item.strMealThumb }
              alt={ item.strMeal }
            />
            <Carousel.Caption>
              <h3
                data-testid={ `${index}-recomendation-title` }
              >
                { item.strMeal }
              </h3>
              <h4>{ item.strCategory }</h4>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <Button
        variant="success"
        data-testid="start-recipe-btn"
        className="startRecipeBtn"
        onClick={ handleStartRecipeBtn }
      >
        Iniciar Receita
      </Button>

    </div>

  );
}
