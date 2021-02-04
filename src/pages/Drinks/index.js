import React, { useEffect, useContext } from 'react';
import Card from '../../components/Cards';
import Header from '../../components/Header';
import Footer from '../Footer';
import RecipesContext from '../../Context/RecipesContext';

let filter = '';

export default function Drinks() {
  const {
    recipes,
    control,
    fetchDrinks,
    setRecipes,
    filteredRecipes,
  } = useContext(RecipesContext);

  const zero = 0;
  const twelve = 12;

  const applyFilter = (value) => {
    setRecipes([]);
    switch (filter) {
    case value:
      filter = '';
      break;
    default:
      filter = value;
      break;
    }
    if (filter !== '') fetchDrinks('category', filter, true);
    if (filter === '') fetchDrinks('searchName', filter, true);
  };

  const pageLoading = (
    <div>
      <Header title="Bebidas" />
      <h2>
        Carregando...
      </h2>
      <Footer />
    </div>
  );

  const categoryButtons = (
    <div>
      <button
        data-testid="All-category-filter"
        onClick={ ({ target }) => applyFilter(target.value) }
        type="button"
        value=""
      >
        All
      </button>
      <button
        data-testid="Ordinary Drink-category-filter"
        onClick={ ({ target }) => applyFilter(target.value) }
        type="button"
        value="Ordinary Drink"
      >
        Ordinary Drink
      </button>
      <button
        data-testid="Cocktail-category-filter"
        onClick={ ({ target }) => applyFilter(target.value) }
        type="button"
        value="Cocktail"
      >
        Cocktail
      </button>
      <button
        data-testid="Milk / Float / Shake-category-filter"
        onClick={ ({ target }) => applyFilter(target.value) }
        type="button"
        value="Milk / Float / Shake"
      >
        Milk / Float / Shake
      </button>
      <button
        data-testid="Other/Unknown-category-filter"
        onClick={ ({ target }) => applyFilter(target.value) }
        type="button"
        value="Other/Unknown"
      >
        Other / Unknown
      </button>
      <button
        data-testid="Cocoa-category-filter"
        onClick={ ({ target }) => applyFilter(target.value) }
        type="button"
        value="Cocoa"
      >
        Cocoa
      </button>
    </div>
  );

  const filteredMap = () => {
    if (!filteredRecipes.drinks
      || filteredRecipes.drinks.length === zero) {
      return null;
    } return (
      filteredRecipes.drinks.map((recipe, index) => {
        if (control) {
          return <Card recipe={ recipe } index={ index } key={ index } />;
        }
        return null;
      })
    );
  };

  useEffect(() => {
    fetchDrinks('searchName', '', false);
  }, []);

  if (!recipes.drinks
    || recipes.drinks.length === zero) {
    return pageLoading;
  }

  return (
    <div>
      <Header title="Bebidas" />
      { categoryButtons }
      { recipes.drinks.map((recipe, index) => {
        if (control) {
          return null;
        }
        if (index < twelve) {
          return <Card recipe={ recipe } index={ index } key={ index } />;
        }
        return null;
      })}
      { filteredMap() }
      <Footer />
    </div>
  );
}
