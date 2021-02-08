import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import {
  fetchAPIDrinks,
  fetchAPICategoriesDrinks,
  fetchAPICategoriesDrinkFilter,
} from '../services/api';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';

function Drinks() {
  const { foodsOrDrinksList, isUse, setIsUse } = useContext(RecipesContext);
  const [apiCategoriesDrinks, setApiCategoriesDrinks] = useState([]);
  const [filterByCategory, setFilterByCategory] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [buttonName, setButtonName] = useState('');

  const getApiDrinks = async () => {
    setFilterByCategory(await fetchAPIDrinks());
  };

  const getApiCategoriesDrinks = async () => {
    setApiCategoriesDrinks(await fetchAPICategoriesDrinks());
  };

  useEffect(() => {
    if (!isUse) {
      getApiDrinks();
      getApiCategoriesDrinks();
    }
    setIsUse(false);
  }, []);

  useEffect(() => {
    setFilterByCategory(foodsOrDrinksList);
  }, [foodsOrDrinksList]);

  const handleClick = async ({ target: { name } }) => {
    if (name === 'all') {
      const resetFilter = (await fetchAPIDrinks());
      setFilterByCategory(resetFilter);
    } else if (buttonClicked === false || buttonName !== name) {
      setButtonClicked(true);
      setButtonName(name);
      const filterCategory = (await fetchAPICategoriesDrinkFilter(name));
      const filterCategoryDrink = filterCategory.filter((item) => item.strDrink);
      setFilterByCategory(filterCategoryDrink);
    } else {
      setButtonClicked(false);
      const resetFilter = (await fetchAPIDrinks());
      setFilterByCategory(resetFilter);
    }
  };

  const zero = 0;
  const maxDrinks = 12;
  const maxCategoriesDrinks = 5;

  return (
    <div>
      <div className="profile-buttons">
        <button
          className="btn color-button main-pages-buttons"
          style={ { width: '23.4rem' } }
          data-testid="All-category-filter"
          name="all"
          type="button"
          onClick={ handleClick }
        >
          All
        </button>
        {apiCategoriesDrinks !== undefined ? (
          apiCategoriesDrinks.map((item) => (
            <button
              className="btn color-button main-pages-buttons"
              style={ { width: '23.4rem' } }
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
        {filterByCategory !== undefined ? (
          filterByCategory.map((item, index) => (
            <Link
              to={ `/bebidas/${item.idDrink}` }
              key={ item.strDrink }
              onClick={ () => console.log('teste') }
              className="card col-6"
              style={ { width: '8rem' } }
            >
              <div
                data-testid={ `${index}-recipe-card` }
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
            </Link>
          )).slice(zero, maxDrinks)) : (
          []
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
