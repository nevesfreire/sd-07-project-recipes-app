import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Context } from '../../context/Provider';
import { fetchDetails } from '../../services/api';

import Info from './Info';
import Carousel from '../../components/Carousel';
import './style.css';

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

const getIngredientsList = (list) => {
  const ingredients = Object.entries(list).reduce(getIngredients, []);
  const measures = Object.entries(list).reduce(getMeasures, []);

  const ingredientsList = [];

  ingredients.forEach((_, index) => {
    ingredientsList.push(`${ingredients[index]} - ${measures[index]}`);
  });

  return ingredientsList;
};

const formatData = (data) => ({
  id: data.idMeal || data.idDrink,
  name: data.strMeal || data.strDrink,
  src: data.strMealThumb || data.strDrinkThumb,
  category: data.strCategory,
  instructions: data.strInstructions || '',
  video: data.strYoutube || '',
  ingredients: getIngredientsList(data),
  alcoholic: data.strAlcoholic !== undefined,
  area: data.strArea || '',
});

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

  useEffect(() => {
    const { pathname } = history.location;

    if (pathname.split('/')[1] === 'comidas') setApi('meal');
    else setApi('drink');

    const id = pathname.split('/')[2];

    const fetchData = async () => {
      const api = pathname.includes('comidas') ? 'meal' : 'drink';
      const data = await fetchDetails(id, api);
      const formatedData = formatData(data);
      setDetailData(formatedData);
    };

    if (!results.lenght) fetchData();
    else {
      const formatedData = formatData(results[id]);
      setDetailData(formatedData);
    }
  }, [history.location, results, setApi]);

  return (
    <section>
      <Info data={ detailData } />
      <Carousel history={ history } />
    </section>
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
