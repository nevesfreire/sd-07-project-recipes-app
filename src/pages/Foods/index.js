import React, { useEffect, useContext } from 'react';
import Card from '../../components/Cards';
import Header from '../../components/Header';
import RecipesContext from '../../Context/RecipesContext';

let filter = '';

export default function Foods() {
  const {
    recipes,
    control,
    fetchMeals,
    setRecipes,
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
    if (filter !== '') fetchMeals('category', filter);
    if (filter === '') fetchMeals('searchName', filter);
  };

  const pageLoading = (
    <div>
      <Header title="Comidas" />
      <h2>
        Carregando...
      </h2>
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
        data-testid="Beef-category-filter"
        onClick={ ({ target }) => applyFilter(target.value) }
        type="button"
        value="Beef"
      >
        Beef
      </button>
      <button
        data-testid="Breakfast-category-filter"
        onClick={ ({ target }) => applyFilter(target.value) }
        type="button"
        value="Breakfast"
      >
        Breakfast
      </button>
      <button
        data-testid="Chicken-category-filter"
        onClick={ ({ target }) => applyFilter(target.value) }
        type="button"
        value="Chicken"
      >
        Chicken
      </button>
      <button
        data-testid="Dessert-category-filter"
        onClick={ ({ target }) => applyFilter(target.value) }
        type="button"
        value="Dessert"
      >
        Dessert
      </button>
      <button
        data-testid="Goat-category-filter"
        onClick={ ({ target }) => applyFilter(target.value) }
        type="button"
        value="Goat"
      >
        Goat
      </button>
    </div>
  );

  useEffect(() => {
    fetchMeals('searchName', '');
  }, []);

  if (!recipes.meals || recipes.meals.length === zero) {
    return pageLoading;
  }

  return (
    <div>
      <Header title="Comidas" />
      { categoryButtons }
      { recipes.meals.map((recipe, index) => {
        if (control) {
          return <Card recipe={ recipe } index={ index } key={ index } />;
        }
        if (index < twelve) {
          return <Card recipe={ recipe } index={ index } key={ index } />;
        }
        return null;
      })}
    </div>
  );
}
