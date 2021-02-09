import React, { useEffect, useContext } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import Card from '../../components/Cards';
import Header from '../../components/Header';
import Footer from '../Footer';
import RecipesContext from '../../Context/RecipesContext';
import Loading from '../../components/Loading';
import './style.css';

let filter = '';

const applyFilter = (value, setRecipes, fetchMeals) => {
  setRecipes([]);
  if (filter === value) {
    filter = '';
  } else {
    filter = value;
  }
  if (filter !== '') fetchMeals('category', filter, true);
  if (filter === '') fetchMeals('searchName', filter, true);
};

export default function Foods() {
  const {
    recipes,
    control,
    fetchMeals,
    setRecipes,
    filteredRecipes,
  } = useContext(RecipesContext);

  const zero = 0;
  const twelve = 1000;

  const pageLoading = (
    <div>
      <Header title="Comidas" />
      <h2>
        Carregando...
      </h2>
      <Footer />
    </div>
  );

  const categoryButtons = (
    <ButtonGroup className=" category-buttons">
      <Button
        active={ filter === '' }
        data-testid="All-category-filter"
        onClick={ ({ target }) => applyFilter(target.value, setRecipes, fetchMeals) }
        value=""
        variant="secondary"
      >
        All
      </Button>
      <Button
        active={ filter === 'Beef' }
        data-testid="Beef-category-filter"
        onClick={ ({ target }) => applyFilter(target.value, setRecipes, fetchMeals) }
        value="Beef"
        variant="secondary"
      >
        Beef
      </Button>
      <Button
        active={ filter === 'Breakfast' }
        data-testid="Breakfast-category-filter"
        onClick={ ({ target }) => applyFilter(target.value, setRecipes, fetchMeals) }
        value="Breakfast"
        variant="secondary"
      >
        Breakfast
      </Button>
      <Button
        active={ filter === 'Chicken' }
        data-testid="Chicken-category-filter"
        onClick={ ({ target }) => applyFilter(target.value, setRecipes, fetchMeals) }
        value="Chicken"
        variant="secondary"
      >
        Chicken
      </Button>
      <Button
        active={ filter === 'Dessert' }
        data-testid="Dessert-category-filter"
        onClick={ ({ target }) => applyFilter(target.value, setRecipes, fetchMeals) }
        value="Dessert"
        variant="secondary"
      >
        Dessert
      </Button>
      {/* <Button
        active={ filter === 'Goat' }
        data-testid="Goat-category-filter"
        onClick={ ({ target }) => applyFilter(target.value, setRecipes, fetchMeals) }
        value="Goat"
        variant="secondary"
      >
        Goat
      </Button> */}
    </ButtonGroup>
  );

  const filteredMap = () => {
    if (!filteredRecipes.meals
      || filteredRecipes.meals.length === zero) {
      return null;
    } return (
      filteredRecipes.meals.map((recipe, index) => {
        if (control && index < twelve) {
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
    return <Loading headerTitle="Comidas" />;
  }

  return (
    <>
      <div className="recipes-page-container">
        <Header title="Comidas" />
        { categoryButtons }
        <div className="recipes-section" id="recipes-section">
          { recipes.meals.map((recipe, index) => {
            if (control || index >= twelve) {
              return null;
            }
            return <Card recipe={ recipe } index={ index } key={ index } />;
          })}
          { filteredMap() }
        </div>
      </div>
      <Footer />
    </>
  );
}
