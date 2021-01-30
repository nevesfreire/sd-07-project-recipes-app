import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const ExploreDrinkIngredients = () => {
  const [drinkIngredientsCategory, setDrinkIngredientsCategory] = useState();
  const [drinkRecipes, setDrinkRecipes] = useState();
  console.log(drinkRecipes);
  const callApi = async () => {
    const zero = 0;
    const doze = 12;
    const fetching = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const json = await fetching.json();
    const results = await json.drinks;
    await setDrinkIngredientsCategory(results.slice(zero, doze));
  };

  const filterDrink = async (url) => {
    const newRequest = await fetch(url);
    const newJson = await newRequest.json();
    await setDrinkRecipes(newJson);
  };

  useEffect(() => {
    callApi();
  }, []);

  const renderCards = () => (
    <div>
      {drinkIngredientsCategory.map((ingredient, i) => (
        <div
          data-testid={ `${i}-ingredient-card` }
          key={ i }
        >
          <Link
            onClick={ () => filterDrink(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient.strIngredient1}`) }
            to="/bebidas"
            key={ i }
          >
            <img
              src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
              data-testid={ `${i}-card-img` }
              alt={ ingredient.strIngredient1 }
            />
          </Link>
          <p data-testid={ `${i}-card-name` }>{ingredient.strIngredient1}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <Header title="Explore Ingredientes" />
      {!drinkIngredientsCategory ? 'Carregando...' : renderCards()}
      <Footer />
    </div>
  );
};

export default ExploreDrinkIngredients;
