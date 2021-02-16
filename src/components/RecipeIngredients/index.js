import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { LS_KEYS } from '../../services/localStorage';
import { Container, StyledUL, Item, DoneItem } from './styles';

const checkIngredient = (
  { inProgressRecipes, checked, ingredient, recipeId, recipeType },
) => {
  if (checked) {
    if (Object.prototype.hasOwnProperty
      .call(inProgressRecipes[recipeType],
        recipeId)) {
      return {
        ...inProgressRecipes,
        [recipeType]: {
          ...inProgressRecipes[recipeType],
          [recipeId]: [
            ...inProgressRecipes[recipeType][recipeId],
            ingredient,
          ],
        },
      };
    }
    return {
      ...inProgressRecipes,
      [recipeType]: {
        ...inProgressRecipes[recipeType],
        [recipeId]: [
          ingredient,
        ],
      },
    };
  }
  return {
    ...inProgressRecipes,
    [recipeType]: {
      ...inProgressRecipes[recipeType],
      [recipeId]:
        inProgressRecipes[recipeType][recipeId]
          .filter((value) => value !== ingredient),
    },

  };
};

export default function RecipeIngredients(props) {
  const [stateProps] = useState(props);
  const { ingredients, isInProgress, handleIngredients } = stateProps;
  const [ingredientsDone, setIngredientsDone] = useState([]);
  const [inProgressRecipes,
    setInProgressRecipes] = useLocalStorage(LS_KEYS.IN_PROGRESS_RECIPES_KEY, {
    cocktails: {}, meals: {},
  });
  const { recipeId } = useParams();
  const { pathname } = useLocation();

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

  const handleChange = ({ target: { value, checked } }) => {
    setInProgressRecipes(checkIngredient({
      inProgressRecipes,
      checked,
      ingredient: value,
      recipeId,
      recipeType: pathname.includes('comidas') ? 'meals' : 'cocktails' }));
  };

  const ingredientElement = (text, index) => {
    if (!isInProgress) {
      return (
        <Item
          key={ text }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {text}
        </Item>
      );
    } if (ingredientsDone && ingredientsDone.includes(text)) {
      return (
        <DoneItem
          key={ text }
          data-testid={ `${index}-ingredient-step` }
        >
          <label htmlFor={ `${index}-ingredient` }>
            <input
              type="checkbox"
              id={ `${index}-ingredient` }
              value={ text }
              checked
              onChange={ handleChange }
            />
            {text}
          </label>
        </DoneItem>
      );
    }
    return (
      <Item
        key={ text }
        data-testid={ `${index}-ingredient-step` }
      >
        <label htmlFor={ `${index}-ingredient` }>
          <input
            type="checkbox"
            id={ `${index}-ingredient` }
            value={ text }
            onChange={ handleChange }
          />
          {text}
        </label>
      </Item>
    );
  };

  return (
    <Container>
      <h4>Ingredients:</h4>
      <StyledUL>
        {
          ingredients.map(({ text }, index) => (
            ingredientElement(text, index)
          ))
        }
      </StyledUL>
    </Container>
  );
}
