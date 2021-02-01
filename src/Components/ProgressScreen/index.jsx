import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { singleCocktail } from '../../API/apiCocktails';
import { singleMeal } from '../../API/apiMeals';

const ProgressScreen = (props) => {
  const { idReceita } = props;
  const location = useLocation();

  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const stringStorage = localStorage.getItem('inProgressRecipe');
    const jsonStorage = JSON.parse(stringStorage);

    if (location.pathname.includes('comidas')) {
      singleMeal(idReceita).then((r) => {
        setRecipe(r);
        if (jsonStorage && jsonStorage.meals[idReceita]) {
          setIngredients(jsonStorage.meals[idReceita]);
        } else setIngredients(r.ingredients);
      });
    } else {
      singleCocktail(idReceita).then((r) => {
        setRecipe(r);
        if (jsonStorage && jsonStorage.cocktails[idReceita]) {
          setIngredients(jsonStorage.cocktails[idReceita]);
        } else setIngredients(r.ingredients);
      });
    }
  }, [idReceita, location.pathname]);

  useEffect(() => {
    const path = location.pathname.includes('comidas') ? 'meals' : 'cocktails';
    const stringStorage = localStorage.getItem('inProgressRecipe');
    const jsonStorage = JSON.parse(stringStorage);

    const objectStorage = {
      meals: {},
      cocktails: {},
    };

    if (jsonStorage === null) {
      localStorage.setItem('inProgressRecipe', JSON.stringify(objectStorage));
    } else {
      jsonStorage[path][idReceita] = ingredients;
      localStorage.setItem('inProgressRecipe', JSON.stringify(jsonStorage));
    }
  }, [ingredients, idReceita, location.pathname]);

  const handleProgress = ({ target }) => {
    const { name } = target;
    const newIngredients = ingredients.map((elem) => {
      if (elem[0] === name) return [elem[0], !elem[1]];
      return elem;
    });
    setIngredients(newIngredients);
  };

  return (
    <div>
      <img
        src={ recipe.imgRecipe }
        alt=""
        width="200"
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{recipe.nameRecipe}</p>
      <button type="button" data-testid="share-btn">
        Compartilhar
      </button>
      <button type="button" data-testid="favorite-btn">
        Favoritar
      </button>
      <p data-testid="recipe-category">{recipe.categoryRecipe}</p>
      {ingredients.map((elem, index) => (
        <label
          htmlFor={ elem[0] }
          key={ elem[0] }
          style={ { display: 'block' } }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            id={ elem[0] }
            name={ elem[0] }
            checked={ elem[1] }
            onClick={ handleProgress }
          />
          {`${elem[0]} - ${recipe.measurements[index] || ''}`}
        </label>
      ))}
      <p data-testid="instructions">{recipe.instructionRecipe}</p>
      <button type="button" data-testid="finish-recipe-btn">
        Finalizar
      </button>
    </div>
  );
};

export default ProgressScreen;

ProgressScreen.propTypes = {
  idReceita: PropTypes.string.isRequired,
};
