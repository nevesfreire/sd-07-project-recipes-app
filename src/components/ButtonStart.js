import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { handleClickMeals } from '../functions/DetailPages';

function ButtonStart({ id, ingredients }) {
  const history = useHistory();
  const [buttonVisibility, setButtonVisibility] = useState('');
  const [buttonStatus, setButtonStatus] = useState('Iniciar Receita');

  useEffect(() => {
    const getDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const meals = Object.values(getDone) || [];
    const findRecipe = meals.find((recipe) => recipe.id === id);
    if (findRecipe) {
      setButtonVisibility(false);
    } else {
      setButtonVisibility(true);
    }
  }, [id]);

  useEffect(() => {
    const getStarted = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    const recipesIds = Object.keys(getStarted.meals);
    const findRecipe = recipesIds.find((element) => element === id);
    if (findRecipe) {
      setButtonStatus('Continuar Receita');
    }
  }, [id]);

  const handleClick = () => {
    history.push(`/comidas/${id}/in-progress`);
    console.log(id);
    handleClickMeals(id, ingredients);
  };

  const showButton = () => (
    <button
      type="button"
      className="startRecipe"
      data-testid="start-recipe-btn"
      onClick={ handleClick }
    >
      { buttonStatus }
    </button>
  );

  return (
    <div>
      { buttonVisibility ? showButton() : null }
    </div>
  );
}

ButtonStart.propTypes = {
  id: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ButtonStart;
