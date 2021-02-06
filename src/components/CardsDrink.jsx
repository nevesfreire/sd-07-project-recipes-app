import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CoffeeAndCodeContext from '../context/CoffeeAndCodeContext';
import { requestApiDrinkFilterName } from '../services/requestDrink';
import '../styles/components/cardsDrink.css';

function CardsDrink() {
  const maxCardAmount = 12;
  const firstCard = 0;
  const [cardAmount, setCardAmount] = useState(maxCardAmount);

  const { cardDrink, setCardDrink } = useContext(CoffeeAndCodeContext);

  const callApi = async () => {
    const apiResult = await requestApiDrinkFilterName();
    setCardDrink(apiResult);
  };

  useEffect(() => {
    if (!cardDrink.length) callApi();
  }, []);

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
              <div className='holder'
                key={ idDrink }
                data-testid={ `${index}-recipe-card` }
              >
                <Link to={ `/bebidas/${idDrink}` }>
                  <div>
                    <img className='image'
                      src={ strDrinkThumb }
                      alt={ strDrink }
                      data-testid={ `${index}-card-img` }
                    />
                  </div>
                </Link>
                <div>
                  <Link to={ `/bebidas/${idDrink}` }>
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
        disabled={ cardDrink.length < cardAmount }
      >
        See More
      </button>
    </div>
  );
}

export default CardsDrink;
