import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer';
import { fetchFoodsArea, fetchFoodsAreaName, fetchAPIFood } from '../services/api';

function OriginFoods() {
  const [foods, setFoods] = useState([]);
  const [apiCategoriesFood, setApiCategoriesFood] = useState([]);
  const [country, setCountry] = useState('');

  const getApiCategoriesFood = async () => {
    setApiCategoriesFood(await fetchFoodsArea());
    setFoods(await fetchAPIFood());
  };

  const getFoodsArea = async () => {
    if (country === 'all') {
      setFoods(await fetchAPIFood());
    } else {
      setFoods(await fetchFoodsAreaName(country));
    }
  };

  useEffect(() => {
    getApiCategoriesFood();
  }, []);

  useEffect(() => {
    getFoodsArea();
  }, [country]);

  const zero = 0;
  const maxMeals = 12;

  return (
    <div>
      {apiCategoriesFood !== undefined && apiCategoriesFood !== null ? (
        <div>
          <select
            data-testid="explore-by-area-dropdown"
            value={ country }
            onChange={ (e) => setCountry(e.target.value) }
          >
            <option key="all" value="all" data-testid="All-option">All</option>
            {apiCategoriesFood
              .map((item) => (
                <option
                  key={ item.strArea }
                  value={ item.strArea }
                  data-testid={ `${item.strArea}-option` }
                >
                  {item.strArea}
                </option>))}
          </select>
        </div>
      ) : []}
      <div className="row" style={ { width: '23.4rem' } }>
        {foods !== undefined && foods !== null ? (
          foods.map((item, index) => (
            <Link
              to={ `/comidas/${item.idMeal}` }
              key={ item.strMeal }
              // onClick={ () => console.log(item.idMeal) }
              className="card col-6"
              style={ { width: '8rem' } }
            >
              <div
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  className="card-img-top"
                  src={ item.strMealThumb }
                  alt="Imagem de capa do card"
                />
                <div className="card-body">
                  <p
                    data-testid={ `${index}-card-name` }
                    className="card-text"
                  >
                    { item.strMeal }
                  </p>
                </div>
              </div>
            </Link>
          )).slice(zero, maxMeals)
        ) : (
          []
        )}
      </div>
      <Footer />
    </div>
  );
}

export default OriginFoods;
