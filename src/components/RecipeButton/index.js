import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LS_KEYS } from '../../services/localStorage';
import useLocalStorage from '../../hooks/useLocalStorage';

import { getDoneMealAndDrinkRecipe } from '../../services/helper';

import { StyledButton } from './styles';

function RecipeButton(props) {
  const [propsState, setPropsState] = useState(props);
  const { title, path, isDisabled } = propsState;
  const { pathname } = useLocation();
  const history = useHistory();
  const recipe = useSelector((state) => state.recipe.data);
  const [doneRecipes, setDoneRecipes] = useLocalStorage(LS_KEYS.DONE_RECIPES_KEY, []);

  const handleClick = () => {
    if (!pathname.includes('in-progress')) {
      history.push(`${path}/in-progress`);
    } else {
      setDoneRecipes([...doneRecipes, getDoneMealAndDrinkRecipe(recipe)]);
      history.push('/receitas-feitas');
    }
  };

  useEffect(() => setPropsState(props), [props]);

  return (

    <StyledButton
      data-testid={ pathname.includes('in-progress')
        ? 'finish-recipe-btn'
        : 'start-recipe-btn' }
      type="button"
      onClick={ handleClick }
      disabled={ isDisabled }
    >
      {title}
    </StyledButton>

  );
}

export default RecipeButton;
