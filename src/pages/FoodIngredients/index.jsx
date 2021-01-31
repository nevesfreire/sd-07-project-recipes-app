import React, { useEffect, useState } from 'react';
import { Header, Footer, IngredientCard } from '../../components';

export default function FoodIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const twelve = 12;
  const fetchFoodIngredients = async () => {
    try {
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const results = await fetch(URL).then((response) => response.json());
      console.log(results.meals);
      setIngredients(results.meals);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFoodIngredients();
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <p>comidas</p>
      <div>
        {
          ingredients.filter((_, index) => index < twelve)
            .map((ingredient, index) => (
              <IngredientCard key={ index } id={ index } ingredient={ ingredient } />
            ))
        }
      </div>
      <Footer />
    </div>
  );
}
