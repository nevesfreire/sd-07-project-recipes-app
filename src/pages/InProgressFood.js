import { Button } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import ShareButton from '../components/DetailsComponents/ShareButton';
import FavButton from '../components/DetailsComponents/FavButton';

export default function InProgressFood() {
  const [usedIngr, setUsedIngr] = useState([]);
  const {
    setDone,
    done,
    recipe,
    setRecipe,
  } = useContext(RecipesContext);

  const history = useHistory();
  const path = history.location.pathname;
  const dois = 2;
  const nove = 9;
  const catorze = 14;
  const vinte = 20;

  useEffect(() => {
    const getRecipe = async () => {
      const id = path.substring(nove, catorze);
      const endpoint = (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { meals } = await fetch(endpoint).then((response) => response.json());
      setRecipe(meals[0]);
    };
    getRecipe();
  }, [path, setRecipe]);

  const listIngredients = [];
  const ingredientsList = () => {
    for (let i = 1; i <= vinte; i += 1) {
      if (recipe[`strIngredient${i}`] !== null && recipe[`strIngredient${i}`] !== '') {
        listIngredients
          .push(`${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`);
      }
    }
    return true;
  };

  useEffect(() => {
    const dataProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (dataProgress) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({ ...dataProgress }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }
  }, []);

  const data = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const handleCheckbox = ({ target }) => {
    const ids = data.meals;
    const { name } = target;
    const { checked } = target;
    if (checked) {
      setUsedIngr([...usedIngr, name]);

      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...data,
        meals: {
          ...ids,
          [recipe.idMeal]: usedIngr,
        },
      }));
    } else {
      setUsedIngr(usedIngr.filter((item) => item !== name));
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...data,
        meals: {
          ...ids,
          [recipe.idMeal]: usedIngr.filter((item) => item !== name),
        },
      }));
    }
  };

  const getDate = () => {
    const date = new Date();
    const day = date.getDate().toString().padStart(dois, '0');
    const month = (date.getMonth() + 1).toString().padStart(dois, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleFinishRecipeBtn = () => {
    setDone([...done, recipe]);
    const dataDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if (dataDone) {
      localStorage.setItem('doneRecipes', JSON.stringify([...dataDone, {
        id: recipe.idMeal,
        type: 'comida',
        area: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
        doneDate: getDate(),
        tags: recipe.strTags.split(','),
      }]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([{
        id: recipe.idMeal,
        type: 'comida',
        area: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
        doneDate: getDate(),
        tags: recipe.strTags.split(','),
      }]));
    }
    history.push('/receitas-feitas');
  };

  const isDisabled = () => {
    if (usedIngr.length === listIngredients.length) return false;
    return true;
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
      />

      <h2 data-testid="recipe-title">
        { recipe.strMeal }
      </h2>

      <h4 data-testid="recipe-category">
        { recipe.strCategory }
      </h4>

      <ShareButton />

      <FavButton />

      <h3>Ingredientes</h3>
      { ingredientsList() }

      <ul className="progress-ingr-list">
        {listIngredients.map((ingredient, key) => (
          <li
            key={ key }
          >
            <label
              htmlFor={ ingredient }
              data-testid={ `${key}-ingredient-step` }
            >
              <input
                name={ ingredient }
                type="checkbox"
                onChange={ handleCheckbox }
              />
              { ingredient }
            </label>
          </li>
        ))}
      </ul>

      <h3>Instruções</h3>
      <span data-testid="instructions">{recipe.strInstructions}</span>

      <Button
        variant="success"
        data-testid="finish-recipe-btn"
        className="finishRecipeBtn"
        onClick={ handleFinishRecipeBtn }
        disabled={ isDisabled() }
      >
        Finalizar Receita
      </Button>

    </div>
  );
}
