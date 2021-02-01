import React from 'react';
import PropTypes from 'prop-types';

function ListCardsDrinks({ arrayDrinks }) {
  return (
    <div>
      {
        arrayDrinks.map((drink, index) => (
          <div key={ drink.idDrink }>
            <div data-testid={ `${index}-recipe-card` }>
              <h5 data-testid={ `${index}-card-name` }>{drink.strDrink}</h5>
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid={ `${index}-card-img` }
              />
            </div>
          </div>
        ))
      }
    </div>
  );
}

ListCardsDrinks.propTypes = {
  arrayDrinks: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default ListCardsDrinks;
