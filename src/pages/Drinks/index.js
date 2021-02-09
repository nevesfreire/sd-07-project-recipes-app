import React, { useEffect, useContext } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import Card from '../../components/Cards';
import Header from '../../components/Header';
import Footer from '../Footer';
import RecipesContext from '../../Context/RecipesContext';
import Loading from '../../components/Loading';

let filter = '';

const applyFilter = (value, setRecipes, fetchDrinks) => {
  setRecipes([]);
  if (filter === value) {
    filter = '';
  } else {
    filter = value;
  }
  if (filter !== '') fetchDrinks('category', filter, true);
  if (filter === '') fetchDrinks('searchName', filter, true);
};

export default function Drinks() {
  const {
    recipes,
    control,
    fetchDrinks,
    setRecipes,
    filteredRecipes,
  } = useContext(RecipesContext);

  const zero = 0;
  const twelve = 1000;

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
    <ButtonGroup>
      <Button
        active={ filter === '' }
        data-testid="All-category-filter"
        onClick={ ({ target }) => applyFilter(target.value, setRecipes, fetchDrinks) }
        variant="secondary"
        value=""
      >
        All
      </Button>
      <Button
        active={ filter === 'Ordinary Drink' }
        data-testid="Ordinary Drink-category-filter"
        onClick={ ({ target }) => applyFilter(target.value, setRecipes, fetchDrinks) }
        variant="secondary"
        value="Ordinary Drink"
      >
        Ordinary Drink
      </Button>
      <Button
        active={ filter === 'Cocktail' }
        data-testid="Cocktail-category-filter"
        onClick={ ({ target }) => applyFilter(target.value, setRecipes, fetchDrinks) }
        variant="secondary"
        value="Cocktail"
      >
        Cocktail
      </Button>
      <Button
        active={ filter === 'Milk / Float / Shake' }
        data-testid="Milk / Float / Shake-category-filter"
        onClick={ ({ target }) => applyFilter(target.value, setRecipes, fetchDrinks) }
        variant="secondary"
        value="Milk / Float / Shake"
      >
        Milk / Float / Shake
      </Button>
      <Button
        active={ filter === 'Other/Unknown' }
        data-testid="Other/Unknown-category-filter"
        onClick={ ({ target }) => applyFilter(target.value, setRecipes, fetchDrinks) }
        variant="secondary"
        value="Other/Unknown"
      >
        Other / Unknown
      </Button>
      <Button
        active={ filter === 'Cocoa' }
        data-testid="Cocoa-category-filter"
        onClick={ ({ target }) => applyFilter(target.value, setRecipes, fetchDrinks) }
        variant="secondary"
        value="Cocoa"
      >
        Cocoa
      </Button>
    </ButtonGroup>
  );

  const filteredMap = () => {
    if (!filteredRecipes.drinks
      || filteredRecipes.drinks.length === zero) {
      return null;
    } return (
      filteredRecipes.drinks.map((recipe, index) => {
        if (control && index < twelve) {
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
    return <Loading headerTitle="Bebidas" />;
  }

  return (
    <>
      <div className="recipes-page-container">
        <Header title="Bebidas" />
        { categoryButtons }
        <div className="recipes-section">
          { recipes.drinks.map((recipe, index) => {
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
