import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { doneRecipe } from '../../store/ducks/recipes';
import { getDoneMealAndDrinkRecipe } from '../../services/helper';

import { StyledButton } from './styles';

function RecipeButton(props) {
  const [propsState, setPropsState] = useState(props);
  const { title, path, isDisabled } = propsState;
  const { pathname } = useLocation();
  const history = useHistory();
  const detailsRecipe = useSelector((state) => state.recipes.detailsRecipe);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!pathname.includes('in-progress')) {
      history.push(`${path}/in-progress`);
    } else {
      dispatch(doneRecipe(getDoneMealAndDrinkRecipe(detailsRecipe)));
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
