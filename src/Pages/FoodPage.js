/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import Header from '../Components/Header';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import RecipesContext from '../context/RecipesContext';

function FoodPage() {
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

  const filterByCategory = async (category) => {
    if (!filtered || filter !== category) {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const filteredMeals = await response.json();
      setFirstTwelveRecipes(filteredMeals.meals.slice(zero, twelve));
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
    const id = globalRecipes.meals[0].idMeal;
    return <Redirect to={ `/comidas/${id}` } />;
  }
  return (
    <div>
      <Header title="Comidas" showSearcIcon />
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
            onClick={ () => filterByCategory(strCategory) }
            type="button"
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
              <Card key={ index } item={ recipe } index={ index } isFood />
            ),
          )
        )
        : null}
      <Footer />
    </div>
  );
}

export default FoodPage;
