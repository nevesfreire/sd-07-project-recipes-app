import React, { useEffect, useContext } from 'react';
import Card from '../../components/Cards';
import Header from '../../components/Header';
import Footer from '../Footer';
import RecipesContext from '../../Context/RecipesContext';
import CategoryButtons from './CategoryButtons';

let filter = '';

export default function Foods() {
  const {
    recipes,
    control,
    fetchMeals,
    setRecipes,
    filteredRecipes,
  } = useContext(RecipesContext);

  const zero = 0;
  const twelve = 12;

  const applyFilter = (value) => {
    setRecipes([]);
    if (filter === value) {
      filter = '';
      fetchMeals('searchName', filter, true);
    } else {
      filter = value;
      fetchMeals('category', filter, true);
    }
    // switch (filter) {
    // case value:
    //   filter = '';
    //   break;
    // default:
    //   filter = value;
    //   break;
    // }
    // if (filter !== '') fetchMeals('category', filter, true);
    // if (filter === '') fetchMeals('searchName', filter, true);
  };

  const pageLoading = (
    <div>
      <Header title="Comidas" />
      <h2>
        Carregando...
      </h2>
      <Footer />
    </div>
  );

  const filteredMap = () => {
    if (!filteredRecipes.meals
      || filteredRecipes.meals.length === zero) {
      return null;
    } return (
      filteredRecipes.meals.map((recipe, index) => {
        if (control) {
          return <Card recipe={ recipe } index={ index } key={ index } />;
        }
        return null;
      })
    );
  };

  useEffect(() => {
    fetchMeals('searchName', '', false);
  }, []);

  if (!recipes.meals
    || recipes.meals.length === zero) {
    return pageLoading;
  }

  return (
    <div>
      <Header title="Comidas" />
      <CategoryButtons handleClick={ applyFilter } />
      { recipes.meals.map((recipe, index) => {
        if (control || index >= twelve) {
          console.log('index: ', index);
          return null;
        }
        return <Card recipe={ recipe } index={ index } key={ index } />;
      })}

      {/* { recipes.meals.map((recipe, index) => {
        if (control) {
          return null;
        }
        if (index < twelve) {
          return <Card recipe={ recipe } index={ index } key={ index } />;
        }
        return null;
      })} */}
      { filteredMap() }
      <Footer />
    </div>
  );
}
