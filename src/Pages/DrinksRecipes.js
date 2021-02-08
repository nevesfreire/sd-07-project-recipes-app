import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Card from '../components/Card';
import Header from '../components/Header';
import useFetch from '../hooks/useFetch';
import RecipeContext from '../Context/Context';
import FooterMenu from '../components/FooterMenu';
import Categories from '../components/Categories';

function DrinksRecipes() {
  const { drinkFetch, randomDrinkFetch, drinksCategories } = useFetch();
  const { recipes, categoriesDrinks, setTypeAndIdDetails } = useContext(RecipeContext);
  const [loading, setLoading] = useState(true);

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

  function handleDatails() {
    setTypeAndIdDetails({
      type: 'bebidas',
      id: recipes.drinks[0].idDrink,
    });
    return (
      <Redirect to={ `/bebidas/${recipes.drinks[0].idDrink}` } />
    );
  }

  useEffect(() => {
    if (recipes === []) {
      return setLoading(true);
    }
    if (!recipes.ingredient) {
      randomDrinkFetch();
    }
    drinksCategories()
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return (<div>Loading...</div>);
  }

  return (
    <div>
      <Header title="Bebidas" explore funcFetch={ drinkFetch } />
      <Categories list={ categoriesDrinks } type="drinks" />
      <div className="foodorDrinkContainer">
      {recipes.drinks && !recipes.type && recipes.drinks.length === um
        ? handleDatails()
        : handleRoutes()}
        </div>
      <FooterMenu />
    </div>
  );
}

export default DrinksRecipes;
