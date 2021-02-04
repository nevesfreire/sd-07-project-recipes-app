import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../../common/Header';
import BottowBar from '../../../common/BottomBar';
import { getMealIngredients } from '../../../services/API';
import { AppContext } from '../../../context/AppContext';

function ExploreMealIngredients() {
  const fullLength = 12;
  const { onFilterByMealIngredient } = useContext(AppContext);
  const [ingredients, setIngredientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  const onFetchIngredients = async () => {
    const ingredientsRes = await getMealIngredients();
    const filtered = ingredientsRes.meals.filter((item, index) => index < fullLength);
    setIngredientes(filtered);
    setIsLoading(false);
  };

  const handleFilter = async (ingredient) => {
    await onFilterByMealIngredient(ingredient);
    history.push('/comidas');
  };

  const source = (ingredient) => `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`;

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
            onClick={ () => handleFilter(item.strIngredient) }
            type="button"
          >
            <div data-testid={ `${index}-ingredient-card` }>
              <img
                data-testid={ `${index}-card-img` }
                alt="ingredients"
                src={ source(item.strIngredient) }
              />
              <h1 data-testid={ `${index}-card-name` }>{item.strIngredient}</h1>
            </div>
          </button>
        ))}
      <BottowBar />
    </div>
  );
}

export default ExploreMealIngredients;
