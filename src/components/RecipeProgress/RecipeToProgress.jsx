import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import funcsRecipes from './functionsRecipeToProgress';

import Context from '../../Context';

import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const RecipeToProgress = ({ recipe, commonProps }) => {
  const navigate = useHistory();
  const { handleClickStartRecipe, handleClickFavorite } = useContext(Context);
  const btnvalue = 'Finalizar Receita';
  const [copied, setCopied] = useState(false);
  const [check, setCheck] = useState(true);
  const verdadeiro = true;
  const {
    page, favorite, ingredients, inProgress, id,
  } = commonProps;
  const pathFood = `http://localhost:3000/comidas/${id}`;
  const pathDrink = `http://localhost:3000/bebidas/${id}`;
  const handleClickShare = (path) => {
    copy(path)
      .then(() => setCopied(true))
      .catch((err) => console.log(err));
  };
  const verifyCheckbox = () => {
    const checked = document.querySelectorAll('input:checked').length;
    console.log(checked);
    console.log(ingredients.length);

    if (checked === ingredients.length) {
      console.log('passou');
      setCheck(false);
    }
  };
  if (page === 'meal') {
    const { strMealThumb, strMeal, strCategory, strInstructions } = recipe;

    return (
      <div>
        <img src={ strMealThumb } width="150" alt="meal" data-testid="recipe-photo" />
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <h3 data-testid="recipe-category">{strCategory}</h3>

        <div>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => handleClickShare(pathFood) }
          >
            <img src={ shareIcon } alt="share icon" />
          </button>

          <button
            type="button"
            onClick={ () => handleClickFavorite(recipe, page) }
          >

            <img
              src={ favorite ? blackHeartIcon : whiteHeartIcon }
              alt="favorite icon"
              data-testid="favorite-btn"
            />
          </button>
        </div>
        { copied && 'Link copiado!' }

        <h2>Ingredients</h2>
        <div>
          {
            ingredients.map((ing, index) => (
              <div
                data-testid={ `${index}-ingredient-step` }
                key={ `${ing}-${index}` }
              >
                <input
                  defaultChecked={ funcsRecipes.isChecked(ing, page, id, index) }
                  onChange={ (event) => {
                    funcsRecipes.streakIngredient(
                      `${ing}-${index}`,
                      event,
                      page,
                      id,
                      index,
                    );
                    verifyCheckbox();
                  } }
                  data-testid="ingredient-search-radio"
                  type="checkbox"
                  value={ ing }
                  name={ ing }
                />
                {' '}
                <p id={ `${ing}-${index}` }>{ing}</p>
              </div>
            ))
          }
        </div>

        <h2>Instructions</h2>
        <p data-testid="instructions">{strInstructions}</p>

        <button
          className="start-button"
          type="button"
          disabled={ check }
          data-testid="finish-recipe-btn"
          onClick={ () => {
            handleClickStartRecipe(id, ingredients, page);
            navigate.push('/receitas-feitas');
          } }
        >
          {inProgress ? btnvalue : btnvalue}
        </button>

      </div>

    );
  }

  const { strDrinkThumb, strDrink, strCategory, strInstructions, strAlcoholic } = recipe;

  return (
    <div>
      <img src={ strDrinkThumb } width="150" alt="meal" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{strDrink}</h1>
      <h3 data-testid="recipe-category">
        {strAlcoholic === 'Alcoholic' ? 'Alcoholic' : strCategory}
      </h3>

      <div>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => handleClickShare(pathDrink) }
        >
          <img src={ shareIcon } alt="share icon" />
        </button>

        <button
          type="button"
          onClick={ () => handleClickFavorite(recipe, page) }
        >
          <img
            src={ favorite ? blackHeartIcon : whiteHeartIcon }
            alt="favorite icon"
            data-testid="favorite-btn"
          />
        </button>
      </div>
      { copied && 'Link copiado!' }

      <h2>Ingredients</h2>
      <div>
        {
          ingredients.map((ing, index) => (
            <div
              data-testid={ `${index}-ingredient-step` }
              key={ `${ing}-${index}` }
            >
              <input
                onChange={ (event) => {
                  funcsRecipes.streakIngredient(
                    `${ing}-${index}`,
                    event,
                    page,
                    id,
                    index,
                  );
                  verifyCheckbox();
                } }
                data-testid="ingredient-search-radio"
                type="checkbox"
                value={ ing }
                name={ ing }
              />
              {' '}
              <p id={ `${ing}-${index}` }>{ing}</p>
            </div>

          ))
        }
      </div>

      <h2>Instructions</h2>
      <p data-testid="instructions">{strInstructions}</p>

      <button
        className="start-button"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ check }
        onClick={ () => {
          handleClickStartRecipe(id, ingredients, page);
          navigate.push('/receitas-feitas');
        } }
      >
        { inProgress ? btnvalue : btnvalue }
      </button>

    </div>
  );
};

RecipeToProgress.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  commonProps: PropTypes.shape({
    page: PropTypes.string.isRequired,
    favorite: PropTypes.bool.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    measures: PropTypes.arrayOf(PropTypes.string).isRequired,
    inProgress: PropTypes.bool.isRequired,
    meals: PropTypes.arrayOf(PropTypes.object).isRequired,
    drinks: PropTypes.arrayOf(PropTypes.object).isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeToProgress;
