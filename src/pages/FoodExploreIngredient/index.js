import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import RequestIngredientsFood from '../../services/ingredientFood';
import RequestFoodApi from '../../services/foodApi';
import { FoodContext } from '../../providers/AllProviders';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';

const FoodExploreIngredient = () => {
  const { setData } = useContext(FoodContext);
  const [ingredients, setIngredients] = useState([]);
  const [foodsRedirect, setFoodsRedirect] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      const maxCards = 12;
      const maxIngredients = await RequestIngredientsFood();
      setIngredients(maxIngredients.filter((_, index) => index < maxCards));
    };
    fetchAPI();
  }, []);

  const handleClick = async (query) => {
    setData(await RequestFoodApi(query));
    setFoodsRedirect(true);
  };

  if (foodsRedirect) return <Redirect to="/comidas" />;

  return (
    <div>
      <Header>Explorar ingredientes</Header>
      <div className="explore-ingredients">
        { ingredients.map(({ strIngredient: ingredient }, index) => (
          <button
            key={ ingredient }
            type="button"
            onClick={ () => handleClick(ingredient) }
            data-testid={ `${index}-ingredient-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png` }
              alt={ `${ingredient} thumb` }
            />
            <h2 data-testid={ `${index}-card-name` }>{ingredient}</h2>
          </button>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default FoodExploreIngredient;
