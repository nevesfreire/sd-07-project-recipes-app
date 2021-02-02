import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Context } from '../../context/Provider';
import fetchApi from '../../services/api';
import './style.css';

function Progress({ history, match: { params: { id } } }) {
  const {
    api,
    setApi,
  } = useContext(Context);
  const { pathname } = history.location;
  const [result, setResult] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [done, setDone] = useState([]);

  useEffect(() => {
    if (pathname.includes('bebidas')) setApi('drinks');
    else setApi('meal');
  }, [pathname, setApi]);

  useEffect(() => {
    if (api === '') return;
    const firstFetch = async () => {
      const data = await fetchApi(id, 'recipe', api);
      if (!data) return;
      setResult(data[0]);
    };
    firstFetch();
  }, [api, id, setResult]);

  useEffect(() => {
    const ing = [];
    const meas = [];
    const don = [];
    const twenty = 20;
    for (let index = 1; index <= twenty; index += 1) {
      if (result[`strIngredient${index}`] === ''
        || result[`strIngredient${index}`] === null) break;
      ing[index - 1] = result[`strIngredient${index}`];
      meas[index - 1] = result[`strMeasure${index}`] || '';
      don[index - 1] = false;
    }
    setIngredients(ing);
    setMeasures(meas);
    setDone(don);
  }, [result]);

  useEffect(() => {
    if (api === 'meal') {
      setName('strMeal');
      setImage('strMealThumb');
    } else {
      setName('strDrink');
      setImage('strDrinkThumb');
    }
  }, [api]);

  return (
    <div>
      <h1 data-testid="recipe-title">{result[name]}</h1>
      <h2 data-testid="recipe-category">{ result.strCategory }</h2>
      <img data-testid="recipe-photo" src={ result[image] } alt="thumbnail" />
      <h2>Ingredients list</h2>
      <table>
        {ingredients.map((ingredient, index) => (
          <tr key={ index }>
            <td>{measures[index]}</td>
            <td data-testid={ `${index}-ingredient-step` }>
              <label htmlFor={ `${index}-ingredient` }>
                <input
                  key={ index }
                  type="checkbox"
                  id={ `${index}-ingredient` }
                  name={ `${index}-ingredient` }
                  // checked={ done[index] }
                  onChange={
                    ({ target: { checked } }) => {
                      const newDone = [...done];
                      newDone[index] = checked;
                      setDone(newDone);
                    }
                  }
                />
                <span className={ done[index] ? 'done' : '' }>{ingredient}</span>
              </label>
            </td>
          </tr>
        ))}
      </table>
      <h2>instructions</h2>
      <p data-testid="instructions">{result.strInstructions}</p>
      <nav>
        <Button data-testid="favorite-btn">
          Favorite
        </Button>
        <Button data-testid="share-btn">
          Share
        </Button>
        <Button data-testid="finish-recipe-btn">
          Finish
        </Button>
      </nav>
    </div>
  );
}

export default Progress;
