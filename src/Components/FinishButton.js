import React from 'react';
import PropTypes from 'prop-types';

function FinishButton(props) {
  const { finishRecipe, setFinnished, recipe } = props;

  const redirecttoFinishedPage = () => {
    const { idMeal, strArea, strCategory, strMeal, strMealThumb, strTags } = recipe;
    const doneRecipe = JSON.parse(window.localStorage.getItem('doneRecipes'));
    if (!doneRecipe) {
      window.localStorage.setItem('doneRecipes', JSON.stringify([{
        id: idMeal,
        type: 'comida',
        area: strArea || '',
        category: strCategory || '',
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
        doneDate: new Date(),
        tags: strTags.split(',') || '',
      }]));
      setFinnished(true);
      return true;
    }
    const alreadyDone = doneRecipe.find(({ id }) => id === idMeal);
    if (!alreadyDone) {
      window.localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipe,
        {
          id: idMeal,
          type: 'comida',
          area: strArea || '',
          category: strCategory || '',
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
          doneDate: new Date(),
          tags: strTags.split(',') || '',
        },
      ]));
      setFinnished(true);
      return true;
    }
  };
  return (
    <div>
      <button
        disabled={ !finishRecipe }
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ redirecttoFinishedPage }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

FinishButton.propTypes = {
  finishRecipe: PropTypes.bool.isRequired,
  setFinnished: PropTypes.func.isRequired,
  recipe: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FinishButton;
