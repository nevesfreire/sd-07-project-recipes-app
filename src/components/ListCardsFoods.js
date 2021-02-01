import React from 'react';
import PropTypes from 'prop-types';

function ListCardsFoods({ arrayFoods }) {
  console.log(typeof arrayFoods);
  console.log(arrayFoods[0]);
  return (
    <div>
      {
        arrayFoods.map((food, index) => (
          <div key={ food.idMeal }>
            <div data-testid={ `${index}-recipe-card` }>
              <h5 data-testid={ `${index}-card-name` }>{food.strMeal}</h5>
              <img
                src={ food.strMealThumb }
                alt={ food.strfood }
                data-testid={ `${index}-card-img` }
              />
            </div>
          </div>
        ))
      }
    </div>
  );
}

ListCardsFoods.propTypes = {
  arrayFoods: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListCardsFoods;
