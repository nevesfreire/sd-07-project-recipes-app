import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

import FoodAppContext from '../context/FoodAppContext';
import { categoryMealApi, mealsAPI } from '../services';
import '../styles/recipes.css';

function MainMeals() {
  const {
    mealsData,
    setMealsData,
    showSearch,
    handleClickDetail,
  } = useContext(FoodAppContext);
  const [mealsCategory, setMealsCategory] = useState([]);
  const [toggle, setToggle] = useState(false);

  const history = useHistory();

  async function fecthCategory() {
    const { meals: category } = await categoryMealApi();
    setMealsCategory(category);
  }

  const handleToDetail = (id) => {
    history.push(`/comidas/${id}`);
  };

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
            const { meals } = await mealsAPI('', '');
            setMealsData(meals);
          } }
        >
          All
        </button>
        {mealsCategory && mealsCategory
          .slice(zero, cinco)
          .map(({ strCategory }, index) => (
            <button
              type="button"
              key={ index }
              data-testid={ `${strCategory}-category-filter` }
              hidden={ showSearch ? bools : false }
              value={ strCategory }
              onMouseMove={ () => setToggle(false) }
              onClick={ async ({ target }) => {
                setToggle(false);
                const term = toggle ? '' : target.value;
                const { meals } = await mealsAPI(term, 'c');
                setMealsData(meals);
                setToggle(true);
              } }
            >
              { strCategory}
            </button>
          ))}
      </div>
      <section className="section-meals">
        {mealsData && mealsData
          .slice(zero, doze)
          .map(({ idMeal, strMeal, strMealThumb }, index) => (
            <button
              type="button"
              key={ idMeal }
              className="div-meals"
              data-testid={ `${index}-recipe-card` }
              onClick={ () => handleToDetail(idMeal) }
            >
              <img
                src={ strMealThumb }
                alt="meals"
                data-testid={ `${index}-card-img` }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                {strMeal}
              </p>
            </button>
          ))}
      </section>
    </section>
  );
}

export default MainMeals;
