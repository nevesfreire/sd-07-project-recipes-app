import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DetailsHeader } from '../../components';
import { getStorage, setStorage } from '../../services/localStorage';
import RequestData from '../../services/RequestAPI';
import './style.css';

function RecipesInProgress() {
  const { category, idReceita } = useParams();
  const [progress, setProgress] = useState([]);
  const [details, setDetails] = useState();
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (category === 'comidas') {
      RequestData(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idReceita}`,
      ).then((response) => {
        setDetails(...response.meals);
      });
    } else if (category === 'bebidas') {
      RequestData(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceita}`,
      ).then((response) => {
        setDetails(...response.drinks);
      });
    }
  }, [category, idReceita]);

  function takeIngredients() {
    if (!details) return undefined;
    return Object.keys(details).filter(
      (info) => info.includes('Ingredient')
        && details[info] !== null
        && details[info] !== '',
    );
  }

  function takeMeasure() {
    if (!details) return undefined;
    return Object.keys(details).filter(
      (info) => info.includes('Measure')
        && details[info] !== null
        && details[info] !== '',
    );
  }

  // function handleProgress({ target }) {
  //   const { name, value } = target;
  //   const localProgress = getStorage('inProgressRecipes');

  //   if (category === 'comidas') {
  //     setProgress({
  //       ...localProgress,
  //       ...progress,
  //       meals: { [idReceita]: [...progress.meals[idReceita], value] },
  //     });
  //   } else {
  //     setProgress({
  //       ...localProgress,
  //       ...progress,
  //       cocktails: { [idReceita]: [...progress.cocktails[idReceita], value] },
  //     });
  //   }
  // }

  function handleProgress({ target }) {
    const { name, value, checked } = target;
    console.log(name, value, checked);
    let array = [];
    if (checked) {
      array = [...progress, value];
    } else {
      array = progress.filter((item) => item !== value);
    }
    if (array.length === takeIngredients().length) setDisabled(false);
    const localProgress = getStorage('inProgressRecipes');
    const recipeType = category === 'comidas' ? 'meals' : 'cocktails';

    setStorage('inProgressRecipes', {
      ...localProgress,
      [recipeType]: { [idReceita]: [...array] },
    });
    setProgress(array);
  }

  useEffect(() => {
    let localProgress = getStorage('inProgressRecipes');
    if (!localProgress) {
      setStorage('inProgressRecipes', { meals: {}, cocktails: {} });
      localProgress = { meals: {}, cocktails: {} };
    }
    let currRecipe = [];
    if (category === 'comidas') {
      currRecipe = Object.entries(localProgress.meals).filter(
        (item) => item[0] === idReceita,
      );
    } else {
      currRecipe = Object.entries(localProgress.cocktails).filter(
        (item) => item[0] === idReceita,
      );
    }
    const zero = 0;
    if (currRecipe.length !== zero) setProgress(currRecipe[0][1]);
  }, []);

  return (
    <div>
      {!details && 'Loading...'}
      {details && <DetailsHeader details={ details } />}
      <h2>Ingredients</h2>
      {details
        && takeIngredients().map((ingredients, index) => (
          <div key={ index } data-testid={ `${index}-ingredient-step` }>
            <input
              className="strikethrough-input"
              onClick={ handleProgress }
              type="checkbox"
              id={ index }
              required
              name={ index }
              checked={
                progress
                  ? progress.find((item) => item === details[ingredients])
                  : false
              }
              value={ details[ingredients] }
            />
            <label className="strikethrough-label" htmlFor={ index }>
              {' '}
              {`${details[ingredients]} - ${
                details[takeMeasure()[index]] || ''
              }`}
            </label>
            <br />
          </div>
        ))}

      <h2>Instructions</h2>
      {details && <p data-testid="instructions">{details.strInstructions}</p>}

      <Link to="/receitas-feitas">
        <button
          disabled={ disabled }
          type="submit"
          data-testid="finish-recipe-btn"
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

export default RecipesInProgress;
