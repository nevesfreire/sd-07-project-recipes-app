import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CoffeAndCodeContext from '../context/CoffeeAndCodeContext';
import {
  requestApiDrinkFilterIngredient,
  requestApiDrinkListIngredients,
} from '../services/requestDrink';

function ComidasPorIngredientes() {
  const maxCardAmount = 12;
  const firstCard = 0;
  const [cardAmount, setCardAmount] = useState(maxCardAmount);
  const [ingredientList, setIngredientList] = useState([]);
  const [toDrinks, setToDrinks] = useState(false);
  const { setCardDrink } = useContext(CoffeAndCodeContext);

  const redirectToMainRecipePage = async (strIngredient) => {
    const apiResult = await requestApiDrinkFilterIngredient(strIngredient);
    setCardDrink(apiResult);
    setToDrinks(true);
  };

  const callApi = async () => {
    const apiResult = await requestApiDrinkListIngredients();
    setIngredientList(apiResult);
  };

  useEffect(() => {
    callApi();
  }, []);

  if (!ingredientList) return <span>Loading</span>;
  if (toDrinks) return <Redirect to="/bebidas" />;

  return (
    <div>
      <Header name="Explorar Ingredientes" button={ false } />
      <div>
        {
          ingredientList.slice(firstCard, cardAmount)
            .map(({ strIngredient1 }, index) => (
              <button
                type="button"
                key={ strIngredient1 }
                data-testid={ `${index}-ingredient-card` }
                onClick={ () => redirectToMainRecipePage(strIngredient1) }
              >
                <img
                  src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                  alt={ strIngredient1 }
                  data-testid={ `${index}-card-img` }
                />
                <p
                  data-testid={ `${index}-card-name` }
                >
                  { strIngredient1 }
                </p>
              </button>
            ))
        }
        <button
          type="button"
          onClick={ () => setCardAmount(cardAmount + maxCardAmount) }
          disabled={ ingredientList.length < cardAmount }
        >
          See More
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ComidasPorIngredientes;
