import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Card from '../components/Card';
import Header from '../components/Header';
import useFetch from '../hooks/useFetch';
import RecipeContext from '../Context/Context';
import FooterMenu from '../components/FooterMenu';
import Categories from '../components/Categories';

function FoodRecipes() {
  const { foodFetch, randomFoodFetch, foodCategories } = useFetch();
  const { recipes, categoriesFood, setTypeAndIdDetails } = useContext(RecipeContext);
  const um = 1;

  function handleRoutes() {
    const zero = 0;
    const doze = 12;
    return recipes.meals && recipes.meals.slice(zero, doze).map((meal, index) => (<Card
      data-testid={ `${index}-recipe-card` }
      key={ meal.idMeal }
      name={ meal.strMeal }
      thumb={ meal.strMealThumb }
      index={ index }
      type="comidas"
      id={ meal.idMeal }
    />));
  }

  const url = document.URL;
  console.log('url', url);

  function handleDatails() {
    setTypeAndIdDetails({
      type: 'comidas',
      id: recipes.meals[0].idMeal,
    });
    return (
      <Redirect to={ `/comidas/${recipes.meals[0].idMeal}` } />
    );
  }

  useEffect(() => {
    randomFoodFetch();
    foodCategories();
  }, []);

  return (
    <div>
      <Header title="Comidas" explore funcFetch={ foodFetch } />
      <Categories list={ categoriesFood } type="meals" />
      {recipes.meals && !recipes.type && recipes.meals.length === um
        ? handleDatails()
        : handleRoutes()}
      <FooterMenu />
    </div>
  );
}

export default FoodRecipes;
