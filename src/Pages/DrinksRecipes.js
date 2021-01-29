import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Card from '../components/Card';
import Header from '../components/Header';
import useFetch from '../hooks/useFetch';
import RecipeContext from '../Context/Context';
import FooterMenu from '../components/FooterMenu';
import Categories from '../components/Categories';

function DrinksRecipes() {
  const { drinkFetch, randomDrinkFetch, drinksCategories } = useFetch();
  const { recipes, categoriesDrinks } = useContext(RecipeContext);
  const um = 1;
  function handleRoutes() {
    const zero = 0;
    const doze = 12;
    return recipes.drinks && recipes.drinks.slice(zero, doze).map((drink, index) => (<Card
      data-testid={ `${index}-recipe-card` }
      key={ drink.idDrink }
      name={ drink.strDrink }
      thumb={ drink.strDrinkThumb }
      index={ index }
      type="bebidas"
      id={ drink.idDrink }
    />));
  }

  useEffect(() => {
    randomDrinkFetch();
    drinksCategories();
  }, []);

  return (
    <div>
      <Header title="Bebidas" explore funcFetch={ drinkFetch } />
      <Categories list={ categoriesDrinks } type="drinks" />
      {recipes.drinks && !recipes.type && recipes.drinks.length === um
        ? <Redirect to={ `/bebidas/${recipes.drinks[0].idDrink}` } />
        : handleRoutes()}
      <FooterMenu />
    </div>
  );
}

export default DrinksRecipes;
