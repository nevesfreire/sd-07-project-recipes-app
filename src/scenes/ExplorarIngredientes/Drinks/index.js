import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../../common/Header';
import BottowBar from '../../../common/BottomBar';
import { getDrinkIngredients } from '../../../services/API';
import { AppContext } from '../../../context/AppContext';

function ExploreDrinkIngredients() {
  const fullLength = 12;
  const [ingredients, setIngredientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { onFilterByDrinkIngredient } = useContext(AppContext);

  const history = useHistory();

  const onFetchIngredients = async () => {
    const ingredientsRes = await getDrinkIngredients();
    const filtered = ingredientsRes.drinks.filter((item, index) => index < fullLength);
    setIngredientes(filtered);
    console.log(filtered);
    setIsLoading(false);
  };

  const handleFilter = async (ingredient) => {
    await onFilterByDrinkIngredient(ingredient);
    history.push('/bebidas');
  };

  const source = (ingredient) => `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`;

  useEffect(() => {
    onFetchIngredients();
  }, []);
  return (
    <div>
      <Header />
      {isLoading ? <h1>is Loading...</h1>
        : ingredients.map((item, index) => (
          <button
            key={ index }
            onClick={ () => handleFilter(item.strIngredient1) }
            type="button"
          >
            <div data-testid={ `${index}-ingredient-card` }>
              <img
                data-testid={ `${index}-card-img` }
                alt="ingredients"
                src={ source(item.strIngredient1) }
              />
              <h1 data-testid={ `${index}-card-name` }>{item.strIngredient1}</h1>
            </div>
          </button>
        ))}
      <BottowBar />
    </div>
  );
}

export default ExploreDrinkIngredients;
