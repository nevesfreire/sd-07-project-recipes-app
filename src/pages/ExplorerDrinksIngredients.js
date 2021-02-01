import React, { useState, useEffect } from 'react';
import * as drinkApiFunctions from '../services/drinkApiFunctions';
import ExploreFoodIngredientCards from '../components/ExploreFoodIngredientCards';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Footer from '../components/Footer';

function ExplorerDrinksIngredients() {
  const [allIngredientsToRender, setAllIngredientsToRender] = useState([]);
  useEffect(() => {
    drinkApiFunctions
      .fetchAllDrinkIngredients()
      .then((response) => setAllIngredientsToRender(response.drinks));
  }, []);

  const renderTwelveElements = (array) => {
    // if (array === null) {
    //   return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    // }
    // if (array.length === 1) {
    //   return <Redirect to={ `/comidas/${array[0].idMeal}` } />;
    // }
    // const eleven = 11;
    const initialarray = [...array];
    initialarray.length = 12;
    const finalArray = initialarray
      .map((ingredient, index) => (
        <ExploreFoodIngredientCards
          title={ ingredient.strIngredient1 }
          key={ index }
          index={ index }
        />
      ));
    return finalArray;
  };
  return (
    <div>
      <HeaderNoSearch title="Explorar Ingredientes" />
      {allIngredientsToRender === undefined ? (
        <p>Loading</p>
      ) : (
        renderTwelveElements(allIngredientsToRender)
      )}
      <Footer />
    </div>
  );
}

export default ExplorerDrinksIngredients;
