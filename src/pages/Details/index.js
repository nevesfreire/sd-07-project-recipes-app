import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Context } from '../../context/Provider';
import { fetchDetails } from '../../services/api';

import Info from './Info';
import Carousel from '../../components/Carousel';
import './style.css';

function Details({ history }) {
  const { results, setApi } = useContext(Context);
  const [detailData, setDetailData] = useState({
    id: '',
    name: '',
    src: '',
    category: '',
    instructions: '',
    ingredients: [],
    video: '',
    alcoholic: false,
    area: '',
  });

  const getIngredients = (acc, curr) => (
    curr[0].includes('strIngredient') && curr[1] !== '' && curr[1] !== null
      ? [...acc, curr[1]]
      : acc
  );

  const getMeasures = (acc, curr) => (
    curr[0].includes('strMeasure') && curr[1] !== '' && curr[1] !== null
      ? [...acc, curr[1]]
      : acc
  );

  useEffect(() => {
    const { pathname } = history.location;

    if (pathname.split('/')[1] === 'comidas') setApi('meal');
    else setApi('drink');

    const id = pathname.split('/')[2];

    const getIngredientsList = (list) => {
      const ingredients = Object.entries(list).reduce(getIngredients, []);
      const measures = Object.entries(list).reduce(getMeasures, []);

      const ingredientsList = [];

      ingredients.forEach((_, index) => {
        ingredientsList.push(`${ingredients[index]} - ${measures[index]}`);
      });

      return ingredientsList;
    };

    const fetchData = async () => {
      const api = pathname.includes('comidas') ? 'meal' : 'drink';
      const data = await fetchDetails(id, api);
      setDetailData({
        id: data.idMeal || data.idDrink,
        name: data.strMeal || data.strDrink,
        src: data.strMealThumb || data.strDrinkThumb,
        category: data.strCategory,
        instructions: data.strInstructions,
        video: data.strYoutube || '',
        ingredients: getIngredientsList(data),
        alcoholic: data.strAlcoholic !== undefined,
        area: data.strArea,
      });
    };

    if (!results.lenght) fetchData();
    else {
      setDetailData({
        id: results[id].idMeal || results[id].idDrink,
        name: results[id].strMeal || results[id].strDrink,
        src: results[id].strMealThumb || results[id].strDrinkThumb,
        category: results[id].strCategory,
        instructions: results[id].strInstructions,
        video: results[id].strYoutube || '',
        ingredients: getIngredientsList(results[id]),
        alcoholic: results[id].strAlcoholic !== undefined,
        area: results[id].strArea,
      });
    }
  }, [history.location, results, setApi]);

  return (
    <article>
      <Info data={ detailData } />
      <Carousel history={ history } />
    </article>
  );
}

Details.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Details;
