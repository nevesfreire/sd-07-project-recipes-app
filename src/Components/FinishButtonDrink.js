import React from 'react';
import PropTypes from 'prop-types';

function FinishButtonDrink(props) {
  const { finishRecipe, setFinnished, recipe } = props;

  const redirecttoFinishedPage = () => {
    const {
      idDrink,
      strCategory,
      strDrink,
      strDrinkThumb,
      strAlcoholic,
      strTags } = recipe;
    const doneRecipe = JSON.parse(window.localStorage.getItem('doneRecipes'));
    if (!doneRecipe) {
      window.localStorage.setItem('doneRecipes', JSON.stringify([{
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory || '',
        alcoholicOrNot: strAlcoholic || '',
        name: strDrink,
        image: strDrinkThumb,
        doneDate: new Date(),
        tags: strTags !== null ? strTags.split(',') || '' : [],
      }]));
      setFinnished(true);
      return true;
    }
    const alreadyDone = doneRecipe.find(({ id }) => id === idDrink);
    if (!alreadyDone) {
      window.localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipe,
        {
          id: idDrink,
          type: 'bebida',
          area: '',
          category: strCategory || '',
          alcoholicOrNot: strAlcoholic || '',
          name: strDrink,
          image: strDrinkThumb,
          doneDate: new Date(),
          tags: strTags !== null ? strTags.split(',') || '' : [],
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

FinishButtonDrink.propTypes = {
  finishRecipe: PropTypes.bool.isRequired,
  setFinnished: PropTypes.func.isRequired,
  recipe: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FinishButtonDrink;
