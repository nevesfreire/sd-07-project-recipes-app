/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import RecipesContext from '../context/RecipesContext';

function ExploreFoodByRegion() {
  const {
    globalRecipes,
    isOnlyOne,
    setFirstTwelveRecipes,
    isFetching,
    setIsFetching,
    firstTwelveRecipes } = useContext(RecipesContext);
  const [filtered, setFiltered] = useState(false);
  const [filter, setFilter] = useState('');
  const [regions, setRegions] = useState([]);
  const twelve = 12;
  const zero = 0;

  useEffect(() => {
    if (!globalRecipes.meals && !filtered) {
      const fetchFood = async () => {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const foods = await response.json();
        setFirstTwelveRecipes(foods.meals.slice(zero, twelve));
        setIsFetching(false);
      };
      const fetchRegions = async () => {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        const resultRegions = await response.json();
        setRegions(resultRegions.meals);
        setIsFetching(false);
      };
      fetchFood();
      fetchRegions();
    }
  }, [filtered]);

  const clearFilter = () => {
    setFiltered(false);
  };

  const filterByRegion = async (region) => {
    if (region === 'All') {
      setFilter('All');
      clearFilter();
    } else if (!filtered || filter !== region) {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${region}`);
      const filteredMeals = await response.json();
      setFirstTwelveRecipes(filteredMeals.meals.slice(zero, twelve));
      setIsFetching(false);
      setFilter(region);
      setFiltered(true);
    } else {
      setFiltered(false);
    }
  };

  if (isOnlyOne) {
    const id = globalRecipes.meals[0].idMeal;
    return <Redirect to={ `/comidas/${id}` } />;
  }
  return (
    <div>
      <Header title="Explorar Origem" showSearcIcon />
      <form style={ { display: 'flex', justifyContent: 'center' } }>
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ ({ target: { value } }) => {
            filterByRegion(value);
          } }
          value={ filter }
          style={ { width: '90%', height: '50px', marginTop: '15px', fontSize: '30px' } }
        >
          <option
            data-testid="All-option"
            value="All"
          >
            All
          </option>
          {!isFetching && (
            regions.map(({ strArea }) => (
              <option
                data-testid={ `${strArea}-option` }
                key={ strArea }
                value={ strArea }
              >
                { strArea }
              </option>
            )))}
        </select>
      </form>
      {!isFetching
        ? (
          <div style={ { display: 'flex', flexWrap: 'wrap', width: '100%' } }>
            {firstTwelveRecipes.map(
              (recipe, index) => (
                <Card key={ index } item={ recipe } index={ index } isFood />
              ),
            )}
          </div>
        )
        : null}
      <Footer />
    </div>
  );
}

export default ExploreFoodByRegion;
