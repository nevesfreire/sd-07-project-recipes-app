import React, { useState, useEffect } from 'react';
import * as foodApiFunctions from '../services/foodApiFunctions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainCards from '../components/MainCards';

function MainRecipes() {
  const [data, setData] = useState([]);
  const [foodsToRender, setFoodsToRender] = useState([]);
  const [allFiltersToRender, setAllFiltersToRender] = useState([]);
  const [filtersToRender, setFiltersToRender] = useState([]);
  const [filtered, setFiltered] = useState(false);

  useEffect(() => {
    foodApiFunctions.fetchAllFoodRecipes().then((response) => setData(response));
  }, []);

  useEffect(() => {
    foodApiFunctions
      .fetchAllFoodCategories()
      .then((response) => setAllFiltersToRender(response));
  }, []);

  useEffect(() => {
    setFoodsToRender(data.meals);
  }, [data]);

  useEffect(() => {
    setFiltersToRender(allFiltersToRender.meals);
  }, [allFiltersToRender]);

  const renderTwelveElements = (array) => {
    const eleven = 11;
    const finalArray = array
      .filter((_someFood, index) => index <= eleven)
      .map((food, index) => (
        <MainCards
          thumb={ food.strMealThumb }
          title={ food.strMeal }
          key={ index }
          index={ index }
          id={ food.idMeal }
        />
      ));
    return finalArray;
  };

  const filterButton = (category) => {
    if (filtered === false) {
      // const oldArray = [...data.meals];
      // const newArray = oldArray.filter((food) => food.strCategory === category);
      foodApiFunctions
        .fetchFilterFoodByCategory(category)
        .then((response) => setFoodsToRender(response.meals));
      setFiltered(true);
    } else {
      setFoodsToRender(data.meals);
      setFiltered(false);
    }
  };

  const resetFoodsToRender = () => {
    setFoodsToRender(data.meals);
    setFiltered(false);
  };

  const renderFilveFilters = (array) => {
    const four = 4;
    const finalArray = array
      .filter((_someFilter, index) => index <= four)
      .map((filter, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${filter.strCategory}-category-filter` }
          onClick={ () => filterButton(filter.strCategory) }
        >
          {filter.strCategory}
        </button>
      ));
    const buttonAll = (
      <button
        type="button"
        key="all"
        data-testid="All-category-filter"
        onClick={ () => resetFoodsToRender() }
      >
        All
      </button>
    );
    finalArray.push(buttonAll);
    return finalArray;
  };

  return (
    <div>
      <Header title="Comidas" />
      {filtersToRender === undefined ? (
        <p>Loading</p>
      ) : (
        renderFilveFilters(filtersToRender)
      )}
      {foodsToRender === undefined ? (
        <p>Loading</p>
      ) : (
        renderTwelveElements(foodsToRender)
      )}
      <Footer />
    </div>
  );
}

export default MainRecipes;
