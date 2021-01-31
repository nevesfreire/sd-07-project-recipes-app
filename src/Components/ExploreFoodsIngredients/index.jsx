import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';

const ExploreFoodIngredients = () => {
  const [foodIngredientsCategory, setFoodIngredientsCategory] = useState();
  const [foodRecipes, setFoodRecipes] = useState();

  const callApi = async () => {
    const zero = 0;
    const doze = 12;
    const fetching = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const json = await fetching.json();
    const results = await json.meals;
    await setFoodIngredientsCategory(results.slice(zero, doze));
  };

  const filterFood = async (url) => {
    const newRequest = await fetch(url);
    const newJson = await newRequest.json();
    await setFoodRecipes(...foodRecipes, newJson.meals);
  };

  useEffect(() => {
    callApi();
  }, []);

  const renderCards = () => (
    <div>
      {foodIngredientsCategory.map((ingredient, i) => (
        <div
          data-testid={ `${i}-ingredient-card` }
          key={ i }
        >
          <Link
            onClick={ () => filterFood(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient.strIngredient}`) }
            to="/comidas"
            key={ i }
          >
            <img
              src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
              data-testid={ `${i}-card-img` }
              alt={ ingredient.strIngredient }
            />
            <p data-testid={ `${i}-card-name` }>{ingredient.strIngredient}</p>
          </Link>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {!foodIngredientsCategory ? 'Carregando...' : renderCards()}
      <Footer />
    </div>
  );
};

export default ExploreFoodIngredients;
