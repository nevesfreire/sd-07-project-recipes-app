import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Card from '../components/Card';
import Header from '../components/Header';
import useFetch from '../hooks/useFetch';
import RecipeContext from '../Context/Context';
import FooterMenu from '../components/FooterMenu';

function DrinksRecipes() {
  const { drinkFetch } = useFetch();
  const { recipes } = useContext(RecipeContext);
  const um = 1;
  function handleRoutes() {
    const zero = 0;
    const doze = 12;
    return recipes.drinks && recipes.drinks.slice(zero, doze).map((drink, index) => (<Card
      key={ drink.idDrink }
      name={ drink.strDrink }
      thumb={ drink.strDrinkThumb }
      index={ index }
    />));
  }
  return (
    <div>
      <Header title="Bebidas" explore funcFetch={ drinkFetch } />
      {recipes.drinks && recipes.drinks.length === um
        ? <Redirect to={ `/bebidas/${recipes.drinks[0].idDrink}` } />
        : handleRoutes()}
      <FooterMenu />
    </div>
  );
}

export default DrinksRecipes;
