import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Card from '../components/Card';
import Header from '../components/Header';
import useFetch from '../hooks/useFetch';
import RecipeContext from '../Context/Context';

function FoodRecipes() {
  const { foodFetch } = useFetch();
  const { recipes } = useContext(RecipeContext);
  return (
    <div>
      <Header title="Comidas" explore funcFetch={ foodFetch } />
      {recipes.meals && recipes.meals.lenght === 1 ? recipes.meals.map((item, index) => (<Redirect
        key={ index }
        to={ `/comidas/${item.idMeal}` }
      />)) : recipes.meals && recipes.meals.map((meal) => (<Card
        key={ meal.idMeal }
        name={ meal.strMeal }
      />))}
    </div>
  );
}

export default FoodRecipes;
