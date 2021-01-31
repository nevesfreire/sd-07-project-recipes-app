import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../../Context/RecipeContext';
import Footer from '../Footer';

const ExploreFoodIngredients = () => {
  const [foodIngredientsCategory, setFoodIngredientsCategory] = useState();

  const { dispatch } = useContext(RecipeContext);

  const callApi = async () => {
    const zero = 0;
    const doze = 12;
    const fetching = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const json = await fetching.json();
    const results = await json.meals;
    setFoodIngredientsCategory(results.slice(zero, doze));
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
            onClick={ () => dispatch({
              type: 'SEARCH_INGREDIENT',
              value: ingredient.strIngredient,
              typeSearch: 'i',
            }) }
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
