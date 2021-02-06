import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CoffeAndCodeContext from '../context/CoffeeAndCodeContext';
import {
  requestApiFoodFilterIngredient,
  requestApiFoodListIngredients,
} from '../services/requestFood';

function ComidasPorIngredientes() {
  const maxCardAmount = 12;
  const firstCard = 0;
  const [cardAmount, setCardAmount] = useState(maxCardAmount);
  const [ingredientList, setIngredientList] = useState([]);
  const [toFoods, setToFoods] = useState(false);
  const { setCardFood } = useContext(CoffeAndCodeContext);

  const redirectToMainRecipePage = async (strIngredient) => {
    const apiResult = await requestApiFoodFilterIngredient(strIngredient);
    setCardFood(apiResult);
    setToFoods(true);
  };

  const callApi = async () => {
    const apiResult = await requestApiFoodListIngredients();
    setIngredientList(apiResult);
  };

  useEffect(() => {
    callApi();
  }, []);

  if (!ingredientList) return <span>Loading</span>;
  if (toFoods) return <Redirect to='/comidas' />

  return (
    <div>
      <Header name="Explorar Ingredientes" button={ false } />
      <div>
        {
          ingredientList.slice(firstCard, cardAmount)
            .map(({ strIngredient }, index) => (
              <div
                key={ strIngredient }
                data-testid={ `${index}-ingredient-card` }
                onClick={ () => redirectToMainRecipePage(strIngredient) }
              >
                <img
                  src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                  alt={ strIngredient }
                  data-testid={ `${index}-card-img` }
                />
                <p
                  data-testid={ `${index}-card-name` }
                >
                  { strIngredient }
                </p>
              </div>
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
