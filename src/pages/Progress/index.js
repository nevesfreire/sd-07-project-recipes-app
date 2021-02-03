import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import { Context } from '../../context/Provider';
import fetchApi from '../../services/api';
import { initialize, getItem, saveItem } from '../../services/localStorage';
import IngredientsTable from '../../components/IngredientsTable';
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
  const [msg, setMsg] = useState('');

  useEffect(() => {
    initialize();
  }, []);

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
    if (api === '') return;
    const ing = [];
    const meas = [];
    const don = [];
    const twenty = 20;
    for (let index = 1; index <= twenty; index += 1) {
      if (!result[`strIngredient${index}`]) break;
      ing[index - 1] = result[`strIngredient${index}`];
      meas[index - 1] = result[`strMeasure${index}`] || '';
      don[index - 1] = false;
    }
    const recipesInProgress = getItem('inProgressRecipes');
    let doneIng = [];
    if (api === 'meal') {
      doneIng = [...recipesInProgress.meals[id] || ''];
    } else {
      doneIng = [...recipesInProgress.cocktails[id] || ''];
    }
    doneIng.forEach((index) => { don[index] = true; });
    setIngredients(ing);
    setMeasures(meas);
    setDone(don);
  }, [result, api, id]);

  useEffect(() => {
    if (api === 'meal') {
      setName('strMeal');
      setImage('strMealThumb');
    } else {
      setName('strDrink');
      setImage('strDrinkThumb');
    }
  }, [api]);

  useEffect(() => {
    if (api === '') return;
    const doneIngredients = done
      .map((ing, index) => {
        if (ing === true) return index;
        return false;
      })
      .filter((ing) => ing !== false);
    const newRecipesInProgress = getItem('inProgressRecipes');
    if (api === 'meal') {
      newRecipesInProgress.meals[id] = doneIngredients;
    } else {
      newRecipesInProgress.cocktails[id] = doneIngredients;
    }
    saveItem('inProgressRecipes', newRecipesInProgress);
  }, [id, api, done]);

  return (
    <div>
      <h1 data-testid="recipe-title">{result[name]}</h1>
      <h2 data-testid="recipe-category">{ result.strCategory }</h2>
      <img data-testid="recipe-photo" src={ result[image] } alt="thumbnail" />
      <h2>Ingredients list</h2>
      <IngredientsTable
        ingredients={ ingredients }
        measures={ measures }
        done={ done }
        setDone={ setDone }
      />
      <h2>instructions</h2>
      <p data-testid="instructions">{result.strInstructions}</p>
      <div>{msg}</div>
      <nav>
        <Button data-testid="favorite-btn">
          Favorite
        </Button>
        <Button
          data-testid="share-btn"
          onClick={ () => {
            const recipe = (api === 'meal' ? 'comidas' : 'bebidas');
            copy(`http://localhost:3000/${recipe}/${id}`);
            setMsg('Link copiado!');
          } }
        >
          Share
        </Button>
        <Button data-testid="finish-recipe-btn">
          Finish
        </Button>
      </nav>
    </div>
  );
}

Progress.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Progress;
