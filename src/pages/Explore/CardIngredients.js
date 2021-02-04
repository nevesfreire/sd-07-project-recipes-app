import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../Context/RecipesContext';

export default function CardIngredients({ index, name, isMeal }) {
  const history = useHistory();
  let src = '';
  let path = '/comidas';
  if (isMeal) {
    src = `https://www.themealdb.com/images/ingredients/${name}-Small.png`;
  } else {
    src = `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`;
    path = '/bebidas';
  }

  const { fetchMeals, fetchDrinks } = useContext(RecipesContext);

  const searchRecipes = async () => {
    isMeal
      ? await fetchMeals('ingredient', name, true)
      : await fetchDrinks('ingredient', name, true);
    history.push(path);
  };

  return (
    <div
      className="recipe-card"
      data-testid={ `${index}-ingredient-card` }
    >
      <button
        type="button"
        onClick={ searchRecipes }
      >
        <img
          alt="Recipe Thumbnail"
          data-testid={ `${index}-card-img` }
          src={ src }
          className="recipe-thumb"
          height="250"
        />
        <h2
          className="recipe-name"
          data-testid={ `${index}-card-name` }
        >
          {name}
        </h2>
      </button>
    </div>
  );
}
