import { Button } from 'react-bootstrap';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import ShareButton from '../components/DetailsComponents/ShareButton';
import FavButton from '../components/DetailsComponents/FavButton';

export default function InProgressDrink() {
  const {
    setDone,
    done,
    recipe,
    setRecipe,
  } = useContext(RecipesContext);

  const history = useHistory();
  const path = history.location.pathname;
  const nove = 9;
  const catorze = 14;
  const quinze = 15;
  const vinteSete = 27;

  useEffect(() => {
    const getRecipe = async () => {
      const id = path.length === vinteSete ? path.substring(nove, quinze)
        : path.substring(nove, catorze);
      console.log(id);
      const endpoint = (`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { drinks } = await fetch(endpoint).then((response) => response.json());
      setRecipe(drinks[0]);
    };
    getRecipe();
  }, [path]);

  const listIngredients = [];
  const ingredientsList = () => {
    for (let i = 1; i <= quinze; i += 1) {
      if (recipe[`strIngredient${i}`] !== null && recipe[`strIngredient${i}`] !== '') {
        listIngredients
          .push(`${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`);
      }
    }
    return true;
  };

  const handleFinishRecipeBtn = () => {
    setDone([...done, recipe]);
    history.push('/receitas-feitas');
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
      />

      <h2 data-testid="recipe-title">
        { recipe.strDrink }
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
              data-testid={ `${key}ingredient-step` }
            >
              <input
                name={ ingredient }
                type="checkbox"
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
      >
        Finalizar Receita
      </Button>

    </div>
  );
}
