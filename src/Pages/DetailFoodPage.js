/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import DetailsFood from '../Components/DetailsFood';
import ButtonDetails from '../Components/ButtonDetails';
import RecipesContext from '../context/RecipesContext';

function DetailFoodPage() {
  const { idParams,
    setDoing,
    setDone,
  } = useContext(RecipesContext);

  useEffect(() => {
    const recipeDone = JSON.parse(window.localStorage.getItem('doneRecipes'));
    if (recipeDone) {
      const { meals } = recipeDone;
      if (meals[0]) {
        const findRecipeDoing = Object.keys(meals)
          .find((recipeId) => recipeId === idParams);
        if (findRecipeDoing) {
          setDone(true);
          setDoing(false);
        }
      }
    }
    const recipeDoing = JSON.parse(window.localStorage.getItem('inProgressRecipes'));
    if (recipeDoing) {
      const { meals } = recipeDoing;
      if (meals[0]) {
        const findRecipeDoing = Object.keys(meals)
          .find((recipeId) => recipeId === idParams);
        if (findRecipeDoing) setDoing(true);
      }
    }
  }, [idParams]);
  return (
    <div>
      <DetailsFood />
      <ButtonDetails />
    </div>
  );
}

export default DetailFoodPage;
