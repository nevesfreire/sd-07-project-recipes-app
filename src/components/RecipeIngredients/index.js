import React, { useEffect, useState } from 'react';
import { /*  useDispatch, */ useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
// import { checkIngredient } from '../../store/ducks/recipes';

export default function RecipeIngredients(props) {
  const [stateProps, setStateProps] = useState(props);
  const { ingredients, isInProgress, handleIngredients } = stateProps;
  // const dispatch = useDispatch();
  const [ingredientsDone, setIngredientsDone] = useState([]);
  const inProgressRecipes = useSelector((state) => state.recipes.inProgressRecipes);
  const { recipeId } = useParams();
  const { pathname } = useLocation();

  useEffect(() => (setStateProps(props)), [props]);
  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(
      pathname.includes('comidas')
        ? inProgressRecipes.meals
        : inProgressRecipes.cocktails,
      recipeId,
    )) {
      setIngredientsDone(pathname.includes('comidas')
        ? [...inProgressRecipes.meals[recipeId]]
        : [...inProgressRecipes.cocktails[recipeId]]);
    }
  }, [inProgressRecipes, recipeId, pathname]);

  useEffect(() => {
    handleIngredients(ingredientsDone.length === ingredients.length);
  }, [handleIngredients, ingredientsDone, ingredients]);

  const handleChange = (/* { target: { value, checked } } */) => {
    /*  dispatch(checkIngredient(
      checked,
      value,
      recipeId,
      pathname.includes('comidas') ? 'meals' : 'cocktails',
    )); */
  };

  const ingredientElement = (text, index) => {
    if (!isInProgress) {
      return (
        <li
          key={ text }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {text}
        </li>
      );
    }
    return (
      <li
        key={ text }
        data-testid={ `${index}-ingredient-step` }
      >
        <label htmlFor={ `${index}-ingredient` }>
          <input
            type="checkbox"
            id={ `${index}-ingredient` }
            value={ text }
            checked={ ingredientsDone && ingredientsDone.includes(text) }
            onChange={ handleChange }
          />
          {text}
        </label>
      </li>
    );
  };

  return (
    <>
      <h4>Ingredients:</h4>
      <ul>
        {
          ingredients.map(({ text }, index) => (
            ingredientElement(text, index)
          ))
        }
      </ul>
    </>
  );
}
