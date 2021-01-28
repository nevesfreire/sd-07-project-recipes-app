import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../components/Card';
import Header from '../components/Header';
import useFetch from '../hooks/useFetch';
import RecipeContext from '../Context/Context';

function FoodRecipes() {
  const { foodFetch } = useFetch();

  const { recipes } = useContext(RecipeContext);
  const history = useHistory();

  function recipesRenderCard() {
    const zero = 0;
    const doze = 12;
    return recipes.meals && recipes.meals.slice(zero, doze).map((meal) => (<Card
      key={ meal.idMeal }
      name={ meal.strMeal }
    />));
  }
  useEffect(() => {
    if (recipes.meals && recipes.meals.length === 1) {
      history.push(`comidas/${recipes.meals[0].idMeal}`);
    }
  }, [history, recipes.meals]);

  return (
    <div>
      <Header title="Comidas" explore funcFetch={ foodFetch } />
      {recipesRenderCard() }
    </div>
  );
}

export default FoodRecipes;
