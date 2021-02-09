import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Footer, IngredientCard } from '../../components';
import { fetchingDrinks } from '../../services/mandaFoods';
import RecipeContext from '../../context/RecipesContext';
import './DrinkIngredients.css';

export default function DrinksIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { setDrinks } = useContext(RecipeContext);
  const { push } = useHistory();
  const twelve = 12;
  const fetchFoodIngredients = async () => {
    try {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      const results = await fetch(URL).then((response) => response.json());
      console.log(results.drinks);
      setIngredients(results.drinks);
    } catch (error) {
      console.log(error);
    }
  };

  const redirectToDrinkPage = async (ingredientSelect) => {
    const selectedIngredient = await fetchingDrinks('Ingrediente', ingredientSelect);
    // console.log(selectedIngredient);
    setDrinks(selectedIngredient);
    push('/bebidas');
  };

  useEffect(() => {
    fetchFoodIngredients();
  }, []);

  return (
    <div className="drink-ingredient-container">
      <Header title="Explorar Ingredientes" />
      <div className="ingredient-drink-content">
        <p>bebidas</p>
        {
          ingredients.filter((_, index) => index < twelve)
            .map((ingredient, index) => (
              <IngredientCard
                key={ index }
                id={ index }
                ingredient={ ingredient }
                redirectToDrinkPage={ redirectToDrinkPage }
              />
            ))
        }
      </div>
      <Footer />
    </div>
  );
}
