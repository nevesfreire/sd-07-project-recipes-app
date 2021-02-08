import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAreas, fetchMealsByArea, fetchApi } from '../../services/api';

function Area() {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectArea] = useState('All');
  const [data, setData] = useState([]);
  const [isFetching, setFetching] = useState(false);

  const getAllMealsFromAPi = async () => {
    const initial = 0;
    const end = 12;
    const allMealsFromApi = await fetchApi('', 'firstFetch', 'meal');
    const slicedMeals = allMealsFromApi.slice(initial, end);
    setData(slicedMeals);
    setFetching(true);
  };

  const getAreasFromApi = async () => {
    const areasFromApi = await fetchAreas();
    setAreas(areasFromApi);
  };

  const getDataFromApi = async () => {
    const initial = 0;
    const end = 12;
    if (selectedArea === 'All') {
      return getAllMealsFromAPi();
    }
    const dataFromApi = await fetchMealsByArea(selectedArea);
    const newData = dataFromApi.meals;
    const newDataSliced = newData.slice(initial, end);
    setData(newDataSliced);
  };

  const selectArea = (event) => {
    const { value } = event.target;
    setSelectArea(value);
  };

  useEffect(() => {
    getAreasFromApi();
    getAllMealsFromAPi();
  }, []);

  useEffect(() => {
    if (isFetching) {
      getDataFromApi();
    }
  }, [selectedArea]);

  return (
    <main
      style={ { marginTop: 10, marginBottom: 52 } }
    >
      <label
        htmlFor="method-input"
        style={ { width: '100%', padding: '15px 30px' } }
      >
        Área:
        <select
          className="search__input"
          data-testid="explore-by-area-dropdown"
          onChange={ (event) => selectArea(event) }
        >
          {areas.map(((area) => (
            <option
              key={ area }
              data-testid={ `${area}-option` }
              value={ area }
            >
              { area }
            </option>
          )))}
        </select>
      </label>
      <section className="card__container">
        {isFetching && data.map((recipe, index) => (
          <Link
            to={ `/comidas/${recipe.idMeal}` }
            className="card"
            key={ recipe.idMeal }
          >
            <header>
              <img
                data-testid={ `${index}-card-img` }
                alt="Foto do Alimento"
                src={ recipe.strMealThumb }
                width="50px"
              />
            </header>
            <main data-testid={ `${index}-recipe-card` }>
              <p data-testid={ `${index}-card-name` }>
                { recipe.strMeal }
              </p>
            </main>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default Area;
