import React, { useState, useEffect } from 'react';

import {
  fetchAPIDrinks,
  fetchAPICategoriesDrinks,
  fetchAPICategoriesDrinkFilter,
} from '../services/api';
import Footer from '../components/Footer';

function Drinks() {
  const [apiCategoriesDrinks, setApiCategoriesDrinks] = useState([]);
  const [filterByCategory, setFilterByCategory] = useState([]);

  const getApiDrinks = async () => {
    setFilterByCategory(await fetchAPIDrinks());
  };

  const getApiCategoriesDrinks = async () => {
    setApiCategoriesDrinks(await fetchAPICategoriesDrinks());
  };

  useEffect(() => {
    getApiDrinks();
    getApiCategoriesDrinks();
  }, []);

  const handleClick = async ({ target: { name } }) => {
    const filterCategory = (await fetchAPICategoriesDrinkFilter(name));
    const filterCategoryDrink = filterCategory.filter((item) => item.strDrink);
    setFilterByCategory(filterCategoryDrink);
  };

  const zero = 0;
  const maxDrinks = 12;
  const maxCategoriesDrinks = 5;

  return (
    <div>
      <div>
        {apiCategoriesDrinks !== undefined ? (
          apiCategoriesDrinks.map((item) => (
            <button
              className="btn btn-outline-dark btn-sm btn-block"
              style={ { width: '22.5rem' } }
              data-testid={ `${item.strCategory}-category-filter` }
              name={ item.strCategory }
              type="button"
              onClick={ handleClick }
              key={ item.strCategory }
            >
              {item.strCategory}
            </button>
          )).slice(zero, maxCategoriesDrinks)
        ) : []}
      </div>
      <div className="row" style={ { width: '23.4rem' } }>
        {filterByCategory.map((item, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ item.strDrink }
            className="card col-6"
            style={ { width: '8rem' } }
          >
            <img
              data-testid={ `${index}-card-img` }
              className="card-img-top"
              src={ item.strDrinkThumb }
              alt="Imagem de capa do card"
            />
            <div className="card-body">
              <p
                data-testid={ `${index}-card-name` }
                className="card-text"
              >
                { item.strDrink }
              </p>
            </div>
          </div>
        )).slice(zero, maxDrinks)}
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
