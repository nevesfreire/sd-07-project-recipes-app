import React, { useEffect, useState } from 'react';
import getMeals from '../../services/mealAPI';
import Header from '../../components/Header';
import Card from '../../components/Cards';
import Footer from '../Footer';

export default function FoodByArea() {
  const [areas, setAreas] = useState([]);
  const [selectValue, setSelectValue] = useState('All');
  const [data, setData] = useState([]);

  const zero = 0;
  const twelve = 12;

  useEffect(() => {
    async function fetchArea() {
      const response = await getMeals('listArea', '');
      setAreas(response.meals);
    }
    fetchArea();
  }, [setAreas]);

  useEffect(() => {
    async function fetchMeal() {
      let response = [];
      if (selectValue === 'All') {
        response = await getMeals('searchName', '');
      } else {
        response = await getMeals('area', selectValue);
      }
      setData(response.meals);
    }
    fetchMeal();
  }, [setData, selectValue]);

  function handleSelect({ target }) {
    setSelectValue(target.value);
  }

  if (areas.length < 1) {
    return null;
  }

  if (!data || data.length === zero) {
    return (
      <h2>
        Carregando...
      </h2>
    );
  }

  return (
    <div>
      <Header title="Explorar Origem" />
      <select
        value={ selectValue }
        onChange={ handleSelect }
        data-testid="explore-by-area-dropdown"
      >
        <option
          data-testid="All-option"
          value="All"
        >
          All
        </option>
        { areas.map(
          (area, index) => (
            <option
              key={ index }
              value={ area.strArea }
              data-testid={ `${area.strArea}-option` }
            >
              { area.strArea }
            </option>
          ),
        )}
      </select>
      { (data.length > zero)
        && data.map((recipe, index) => {
          if (index < twelve) {
            return <Card recipe={ recipe } index={ index } key={ index } />;
          }
          return null;
        })}
      <Footer />
    </div>
  );
}
