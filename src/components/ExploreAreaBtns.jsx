import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../contextAPI/context';
import { fetchApi, allFood, allFoodAreas, getFoodArea } from '../services/fetchApi';

const fetchAreas = async (pathname, setAreas) => {
  const newData = await fetchApi(allFoodAreas);
  console.log(newData);
  setAreas(newData.meals);
};

const fetchArea = async (area, setState) => {
  let newData = '';
  if (area !== 'All') {
    newData = await fetchApi(getFoodArea(area));
  }
  if (area === 'All') {
    newData = await fetchApi(allFood);
  }
  setState((s) => ({
    ...s,
    data: { ...s.data, food: newData.meals },
    filtered: area,
  }
  ));
};

const exploreAreaDrop = (areas, area, setArea) => {
  const handleChange = (event) => {
    setArea(event.target.value);
  };

  return (
    <select
      className="form-select form-select-lg mb-3"
      value={ area }
      onChange={ handleChange }
      data-testid="explore-by-area-dropdown"
    >
      <option data-testid="All-option" value="All">All</option>
      {
        areas
          .map((a, index) => (
            <option
              key={ index }
              value={ a.strArea }
              data-testid={ `${a.strArea}-option` }
            >
              {a.strArea}
            </option>
          ))
      }
    </select>
  );
};

export default function ExploreIngredientsBtns() {
  const { setState } = useContext(context);
  const [areas, setAreas] = useState();
  const [area, setArea] = useState('');
  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    fetchAreas(pathname, setAreas);
  }, [pathname]);

  useEffect(() => {
    fetchArea(area, setState);
    // maria luisa abreu flores
  }, [area, setState]);

  if (!areas) return <div>Loading...</div>;

  return <div>{exploreAreaDrop(areas, area, setArea)}</div>;
}
