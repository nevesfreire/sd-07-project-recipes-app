import React, { useState, useEffect } from 'react';
import HeaderNoSearch from '../components/HeaderNoSearch';
import DoneRecipesCards from '../components/DoneRecipesCards';
import * as localStorageFunctions from '../services/localStorageFunctions';

function DoneRecipes() {
  const [initialDoneRecipes, setInitialDoneRecipes] = useState([]);
  const [atualDoneRecipes, setAtualDoneRecipes] = useState([]);

  useEffect(() => {
    setInitialDoneRecipes(localStorageFunctions.getDoneRecipesLocalStorage());
  }, []);

  useEffect(() => {
    setAtualDoneRecipes(initialDoneRecipes);
  }, [initialDoneRecipes]);

  const filterByFood = () => {
    const arrayOfFood = atualDoneRecipes.filter((item) => item.type === 'comida');
    setAtualDoneRecipes(arrayOfFood);
  };

  const filterByDrink = () => {
    const arrayOfDrink = atualDoneRecipes.filter((item) => item.type === 'bebida');
    setAtualDoneRecipes(arrayOfDrink);
  };

  const resetArrayToRender = () => {
    setAtualDoneRecipes(initialDoneRecipes);
  };

  const renderElements = (array) => {
    const initialarray = [...array];
    const finalArray = initialarray
      .map((foodOrDrink, index) => (
        <DoneRecipesCards
          title={ foodOrDrink.name }
          key={ index }
          index={ index }
          id={ foodOrDrink.id }
          thumb={ foodOrDrink.image }
          type={ foodOrDrink.type }
          tags={ foodOrDrink.tags }
          category={ foodOrDrink.category }
          doneDate={ foodOrDrink.doneDate }
          area={ foodOrDrink.area }
          alcoholicOrNot={ foodOrDrink.alcoholicOrNot }
        />
      ));
    return finalArray;
  };
  return (
    <div>
      <HeaderNoSearch title="Receitas Feitas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ resetArrayToRender }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ filterByFood }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterByDrink }
      >
        Drinks
      </button>
      {atualDoneRecipes === undefined ? (
        <p>Loading</p>
      ) : (
        renderElements(atualDoneRecipes)
      )}
    </div>
  );
}

export default DoneRecipes;
