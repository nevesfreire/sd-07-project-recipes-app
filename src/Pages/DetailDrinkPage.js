/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import ButtonDetails from '../Components/ButtonDetails';
import DetailsDrink from '../Components/DetailsDrink';
import RecipesContext from '../context/RecipesContext';

function DetailDrinkPage() {
  const { idParams,
    setDoing,
    setDone,
  } = useContext(RecipesContext);

  useEffect(() => {
    const recipeDone = JSON.parse(window.localStorage.getItem('doneRecipes'));
    if (recipeDone) {
      const findRecipeDone = recipeDone.find(({ id }) => id === idParams);
      if (findRecipeDone) {
        setDone(true);
        setDoing(false);
        return true;
      }
    }
    const recipeDoing = JSON.parse(window.localStorage.getItem('inProgressRecipes'));
    if (recipeDoing) {
      const { cocktails } = recipeDoing;
      if (cocktails[0]) {
        const findRecipeDoing = Object.Keys(cocktails)
          .find((recipeId) => recipeId === idParams);
        if (findRecipeDoing) setDoing(true);
      }
    }
  }, [idParams]);
  return (
    <div>
      <DetailsDrink />
      <ButtonDetails type="bebida" />
    </div>
  );
}

export default DetailDrinkPage;
