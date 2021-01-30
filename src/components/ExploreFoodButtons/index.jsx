import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Meals from '../../services/meals-api';
import Drinks from '../../services/cocktails-api';

const ExploreFoodButtons = ({ area }) => {
  const [randomFoodId, setRandomFoodId] = useState('');

  useEffect(() => {
    if (area) {
      Meals.getRandomMeal()
        .then(({ idMeal }) => setRandomFoodId(idMeal))
        .catch((err) => console.log(err));
    }

    if (!area) {
      Drinks.getRandomCocktail()
        .then(({ idDrink }) => setRandomFoodId(idDrink))
        .catch((err) => console.log(err));
    }
  }, [area]);

  return (
    <div>
      <Link
        to={ area ? '/explorar/comidas/ingredientes' : '/explorar/bebidas/ingredientes' }
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Link>

      {
        area && (
          <Link
            to={ area ? '/explorar/comidas/area' : '/explorar/bebidas/area' }
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </Link>
        )
      }

      <Link
        to={ area ? `/comidas/${randomFoodId}` : `/bebidas/${randomFoodId}` }
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </Link>
    </div>
  );
};

ExploreFoodButtons.propTypes = { area: PropTypes.string.isRequired };

export default ExploreFoodButtons;
