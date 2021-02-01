import React, { useState, useEffect } from 'react';
import * as foodApiFunctions from '../services/foodApiFunctions';
import ExploreFoodIngredientCards from '../components/ExploreFoodIngredientCards';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Footer from '../components/Footer';

function ExplorerFoodIngredients() {
  const [allIngredientsToRender, setAllIngredientsToRender] = useState([]);
  useEffect(() => {
    foodApiFunctions
      .fetchAllFoodIngredients()
      .then((response) => setAllIngredientsToRender(response.meals));
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
          title={ ingredient.strIngredient }
          key={ index }
          index={ index }
          id={ ingredient.idIngredient }
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

export default ExplorerFoodIngredients;
