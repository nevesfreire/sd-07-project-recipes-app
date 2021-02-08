/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../Components/Header';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import RecipesContext from '../context/RecipesContext';
import './style/FoodPage.css';

function FoodPage() {
  const {
    globalRecipes,
    isOnlyOne,
    setFirstTwelveRecipes,
    isFetching,
    setIsFetching,
    firstTwelveRecipes,
    filter,
    filtered,
    setFiltered,
    setFilter,
    filterFoodByCategory } = useContext(RecipesContext);
  const [fiveCategories, setFiveCategories] = useState([]);
  const { ingredient } = useParams();
  const twelve = 12;
  const zero = 0;
  const five = 5;

  useEffect(() => {
    if (ingredient) {
      const fetchFoodByIngredient = async () => {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const foods = await response.json();
        if (foods.meals) {
          setFirstTwelveRecipes(foods.meals.slice(zero, twelve));
          setIsFetching(false);
        }
      };
      fetchFoodByIngredient();
    } else if (!globalRecipes.meals && !filtered) {
      const fetchFood = async () => {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const foods = await response.json();
        setFirstTwelveRecipes(foods.meals.slice(zero, twelve));
        setIsFetching(false);
      };
      const fetchCategories = async () => {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const resultCategories = await response.json();
        setFiveCategories(resultCategories.meals.slice(zero, five));
        setIsFetching(false);
      };
      fetchFood();
      fetchCategories();
    }
  }, [filtered]);

  const clearFilter = () => {
    setFiltered(false);
    setFilter('All');
  };

  const isPrimary = (currentFilter, category) => {
    if (currentFilter === category) return 'primary';
    return 'secondary';
  };

  if (isOnlyOne) {
    const id = globalRecipes.meals[0].idMeal;
    return <Redirect to={ `/comidas/${id}` } />;
  }
  return (
    <div>
      <Header title="Comidas" showSearcIcon />
      <div className="filters">
        <Button
          onClick={ clearFilter }
          type="button"
          data-testid="All-category-filter"
          variant={ isPrimary(filter, 'All') }
        >
          All
        </Button>
        {!isFetching && (
          fiveCategories.map(({ strCategory }) => (
            <Button
              key={ strCategory }
              onClick={ () => filterFoodByCategory(strCategory) }
              data-testid={ `${strCategory}-category-filter` }
              variant={ isPrimary(filter, strCategory) }
            >
              {strCategory}
            </Button>
          ))
        )}
      </div>
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

export default FoodPage;
