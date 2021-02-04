import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DetailsHeader } from '../../components';
import { getStorage, setStorage } from '../../services/localStorage';
import RequestData from '../../services/RequestAPI';
import './style.css';

function RecipesInProgress() {
  const { category, idReceita } = useParams();
  const inProgress = {
    cocktails: { [idReceita]: [] },
    meals: { [idReceita]: [] },
  };
  const [progress, setProgress] = useState(inProgress);
  const [details, setDetails] = useState();
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

  useEffect(() => {
    const localProgress = getStorage('inProgressRecipes');
    if (!localProgress) {
      const inProgress = {
        cocktails: { [idReceita]: [] },
        meals: { [idReceita]: [] },
      };
      setStorage('inProgressRecipes', inProgress);
    }
    else if (localProgress) {
      const newprogress = { localProgress, ...progress };
      console.log(localProgress);
      setStorage('inProgressRecipes', newprogress);
    }
  }, [progress, idReceita]);

  function handleProgress({ target }) {
    const { name, value } = target;
    const localProgress = getStorage('inProgressRecipes');

    if (category === 'comidas') {
      setProgress({
        ...localProgress,
        ...progress,
        meals: { [idReceita]: [...progress.meals[idReceita], value] },
      });
    } else {
      setProgress({
        ...localProgress,
        ...progress,
        cocktails: { [idReceita]: [...progress.cocktails[idReceita], value] },
      });
    }

  }

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

  return (
    <div>
      {!details && 'Loading...'}
      {details && (
        <DetailsHeader details={ details } />)}
      <h2>Ingredients</h2>
      {details && takeIngredients().map((ingredients, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-step` }>
          <input
            onClick={ handleProgress }
            type="checkbox"
            id={ index }
            required
            name={ index }
            value={ details[ingredients] }
          />
          <label className="strikethrough" htmlFor={ index }>
            {' '}
            {`${details[ingredients]} - ${
              details[takeMeasure()[index]] || ''
            }`}
          </label>
          <br />
        </div>
      ))}

      <h2>Instructions</h2>
      {details && (
        <p data-testid="instructions">{details.strInstructions}</p>)}

      <Link to="/receitas-feitas">
        <button type="submit" data-testid="finish-recipe-btn">
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

export default RecipesInProgress;
