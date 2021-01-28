import React, { useContext, useEffect, useState } from 'react';

import FoodAppContext from '../context/FoodAppContext';
import { categoryDrinkApi, drinksAPI } from '../services';
import '../styles/recipes.css';

function MainDrinks() {
  const { drinksData, setDrinksData, showSearch } = useContext(FoodAppContext);
  const [drinksCategory, setDrinksCategory] = useState([]);

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
          data-testid="category-filter"
          hidden={ showSearch ? bools : false }
          onClick={ async () => {
            const { drinks } = await drinksAPI('', '');
            setDrinksData(drinks);
          } }
        >
          All
        </button>
        {drinksCategory.slice(zero, cinco).map(({ strCategory }, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${strCategory}-category-filter` }
            hidden={ showSearch ? bools : false }
            value={ strCategory }
            onClick={ async ({ target }) => {
              const { drinks } = await drinksAPI(target.value, 'c');
              setDrinksData(drinks);
            } }
          >
            { strCategory }
          </button>
        ))}
      </div>
      <section className="section-meals">
        {drinksData.slice(zero, doze).map(({ idDrink, strDrink, strDrinkThumb }) => (
          <div key={ idDrink } className="div-meals" data-testid={ strDrink }>
            <img src={ strDrinkThumb } alt="drinks" />
            <p>{ strDrink }</p>
          </div>
        ))}
      </section>
    </section>
  );
}

export default MainDrinks;
