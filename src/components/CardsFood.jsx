import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CoffeeAndCodeContext from '../context/CoffeeAndCodeContext';
import { requestApiFoodFilterName } from '../services/requestFood';

function CardsFood() {
  const maxCardAmount = 12;
  const firstCard = 0;
  const [cardAmount, setCardAmount] = useState(maxCardAmount);

  const { cardFood, setCardFood } = useContext(CoffeeAndCodeContext);

  useEffect(() => {
    if (!cardFood.length) callApi();
  }, []);

  const callApi = async () => {
    const apiResult = await requestApiFoodFilterName();
    setCardFood(apiResult);
  };

  if (!cardFood.length) return <span>Loading...</span>;
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
  return (
    <div>
      {
        cardFood.slice(firstCard, cardAmount)
          .map((currentObject, index) => {
            const {
              idMeal,
              strMeal,
              strMealThumb,
            } = currentObject;

            return (
              <div
                key={ idMeal }
                data-testid={ `${index}-recipe-card` }
              >
                <Link to={ `/comidas/${idMeal}` }>
                  <img
                    src={ strMealThumb }
                    alt={ strMeal }
                    data-testid={ `${index}-card-img` }
                  />
                </Link>
                <div>
                  <Link to={ `/comidas/${idMeal}` }>
                    <h4 data-testid={ `${index}-card-name` }>{ strMeal }</h4>
                  </Link>
                </div>
              </div>
            );
          })
      }
      <button
        type="button"
        onClick={ () => setCardAmount(cardAmount + maxCardAmount) }
        disabled={ cardFood.length >  cardAmount ? false : true }
      >
        See More
      </button>
    </div>
  );
}

export default CardsFood;