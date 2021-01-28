import React, { useContext } from 'react';

import FoodAppContext from '../context/FoodAppContext';
import '../styles/recipes.css';

function MainDrinks() {
  const { drinksData, drinksCategory, setDrinksData,
    showSearch } = useContext(FoodAppContext);

  const zero = 0;
  const cinco = 5;
  const doze = 12;
  const bools = true;

  return (
    <section>
      <div className="div-category">
        {drinksCategory.slice(zero, cinco).map(({ strCategory }, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${strCategory}-category-filter` }
            hidden={ showSearch ? bools : false }
            value={ strCategory }
            onClick={ ({ target }) => setDrinksData(drinksData.slice(zero, doze).filter(
              ({ strCategory: drinksCat }) => drinksCat === target.value,
            ))}
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
