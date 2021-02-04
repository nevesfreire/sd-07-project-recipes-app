import React, { useEffect } from 'react';

import useArea from '../hooks/useArea';

function ExploreArea() {
  const [mealsData, areas, zero, doze,
    handleToDetail, handlerAreaExplorer, fecthArea] = useArea();

  useEffect(() => {
    fecthArea();
  }, []);

  return (
    <section>
      <div className="div-select-area">
        <select
          data-testid="explore-by-area-dropdown"
          name="area"
          onClick={ handlerAreaExplorer }
        >
          <option
            data-testid="All-option"
            value="All"
          >
            All
          </option>
          {areas && areas.map(({ strArea }) => (
            <option
              key={ strArea }
              data-testid={ `${strArea}-option` }
              value={ strArea }
            >
              { strArea }
            </option>
          ))}
        </select>
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

export default ExploreArea;
