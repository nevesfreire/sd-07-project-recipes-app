import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import FoodAppContext from '../context/FoodAppContext';
import { categoryDrinkApi, drinksAPI } from '../services';
import '../styles/recipes.css';

function MainDrinks() {
  const { drinksData, setDrinksData, showSearch } = useContext(FoodAppContext);
  const [drinksCategory, setDrinksCategory] = useState([]);
  const [toggle, setToggle] = useState(false);

  const history = useHistory();

  async function fecthCategory() {
    const { drinks: category } = await categoryDrinkApi();
    setDrinksCategory(category);
  }

  useEffect(() => {
    fecthCategory();
  }, []);

  const zero = 0;
  const cinco = 5;
  const doze = 12;
  const bools = true;
  return (
    <section>
      <div className="div-category">
        <button
          type="button"
          data-testid="All-category-filter"
          hidden={ showSearch ? bools : false }
          onClick={ async () => {
            const { drinks } = await drinksAPI('', '');
            setDrinksData(drinks);
          } }
        >
          All
        </button>
        {drinksCategory && drinksCategory.slice(zero, cinco).map(({ strCategory }, index) => (
          <button
            type="button"
            className="button-cat"
            key={ index }
            data-testid={ `${strCategory}-category-filter` }
            hidden={ showSearch ? bools : false }
            value={ strCategory }
            onMouseMove={ () => setToggle(false) }
            onClick={ async ({ target }) => {
              setToggle(false);
              const term = toggle ? '' : target.value;
              const { drinks } = await drinksAPI(term, 'c');
              setDrinksData(drinks);
              setToggle(true);
            } }
          >
            { strCategory }
          </button>
        ))}
      </div>
      <section className="section-meals">
        {drinksData && drinksData.slice(zero, doze).map(
          ({ idDrink, strDrink, strDrinkThumb }, index) => (
            <button
              type="button"
              key={ idDrink }
              className="div-meals"
              data-testid={ `${index}-recipe-card` }
              onClick={ () => history.push(`/bebidas/${idDrink}`) }
            >
              <img
                src={ strDrinkThumb }
                alt="drinks"
                data-testid={ `${index}-card-img` }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                { strDrink }
              </p>
            </button>
          ),
        )}
      </section>
    </section>
  );
}

export default MainDrinks;
