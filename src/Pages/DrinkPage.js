import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import RecipesContext from '../context/RecipesContext';

function DrinkPage() {
  const {
    globalRecipes,
    isOnlyOne,
    setFirstTwelveRecipes,
    isFetching,
    setIsFetching,
    firstTwelveRecipes } = useContext(RecipesContext);
  const [filtered, setFiltered] = useState(false);
  const [filter, setFilter] = useState('');
  const [fiveCategories, setFiveCategories] = useState([]);
  const twelve = 12;
  const zero = 0;
  const five = 5;

  useEffect(() => {
    if (!globalRecipes.drinks && !filtered) {
      const fetchDrinks = async () => {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const drinks = await response.json();
        setFirstTwelveRecipes(drinks.drinks.slice(zero, twelve));
        setIsFetching(false);
      };
      const fetchCategories = async () => {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const resultCategories = await response.json();
        setFiveCategories(resultCategories.drinks.slice(zero, five));
        setIsFetching(false);
      };
      fetchDrinks();
      fetchCategories();
    }
  }, [filtered]);

  const filterByCategory = async (category) => {
    if (!filtered || filter !== category) {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      const filteredDrinks = await response.json();
      setFirstTwelveRecipes(filteredDrinks.drinks.slice(zero, twelve));
      setIsFetching(false);
      setFilter(category);
      setFiltered(true);
    } else {
      setFiltered(false);
    }
  };

  const clearFilter = () => {
    setFiltered(false);
  };

  if (isOnlyOne) {
    const id = globalRecipes.drinks[0].idDrink;
    return <Redirect to={ `/bebidas/${id}` } />;
  }
  return (
    <div>
      <Header title="Bebidas" showSearcIcon />
      <button
        onClick={ clearFilter }
        type="button"
        data-testid="All-category-filter"
      >
        All
      </button>
      {!isFetching && (
        fiveCategories.map(({ strCategory }) => (
          <button
            key={ strCategory }
            type="button"
            onClick={ () => filterByCategory(strCategory) }
            data-testid={ `${strCategory}-category-filter` }
          >
            {strCategory}
          </button>
        ))
      )}
      {!isFetching
        ? (
          firstTwelveRecipes.map(
            (recipe, index) => (
              <Card key={ index } recipe={ recipe } index={ index } />
            ),
          )
        )
        : null}
      <Footer />
    </div>
  );
}

export default DrinkPage;
