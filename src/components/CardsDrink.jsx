import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CoffeeAndCodeContext from '../context/CoffeeAndCodeContext';
import { requestApiDrinkFilterName } from '../services/requestDrink';

function CardsFood() {
  const maxCardAmount = 12;
  const firstCard = 0;
  const [cardAmount, setCardAmount] = useState(maxCardAmount);

  const { cardDrink, setCardDrink } = useContext(CoffeeAndCodeContext);

  useEffect(() => {
    if (!cardDrink.length) callApi();
  }, []);

  const callApi = async () => {
    const apiResult = await requestApiDrinkFilterName();
    setCardDrink(apiResult);
  };

  if (!cardDrink.length) return <span>Loading...</span>;
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
  return (
    <div>
      {
        cardDrink.slice(firstCard, cardAmount)
          .map((currentObject, index) => {
            const {
              idDrink,
              strDrink,
              strDrinkThumb,
            } = currentObject;

            return (
              <div
                key={ idDrink }
                data-testid={ `${index}-recipe-card` }
              >
                <Link to={ `/comidas/${idDrink}` }>
                  <img
                    src={ strDrinkThumb }
                    alt={ strDrink }
                    data-testid={ `${index}-card-img` }
                  />
                </Link>
                <div>
                  <Link to={ `/comidas/${idDrink}` }>
                    <h4 data-testid={ `${index}-card-name` }>{ strDrink }</h4>
                  </Link>
                </div>
              </div>
            );
          })
      }
      <button
        type="button"
        onClick={ () => setCardAmount(cardAmount + maxCardAmount) }
        disabled={ cardDrink.length > cardAmount ? false : true }
      >
        See More
      </button>
    </div>
  );
}

export default CardsFood;