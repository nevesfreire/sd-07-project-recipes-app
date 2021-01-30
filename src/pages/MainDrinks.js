import React, { useState, useEffect } from 'react';
import * as drinkApiFunctions from '../services/drinkApiFunctions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainDrinkCards from '../components/MainDrinkCards';

function MainDrinks() {
  const [data, setData] = useState([]);
  const [drinksToRender, setDrinksToRender] = useState([]);
  const [allFiltersToRender, setAllFiltersToRender] = useState([]);
  const [filtersToRender, setFiltersToRender] = useState([]);
  const [filtered, setFiltered] = useState(false);

  useEffect(() => {
    drinkApiFunctions.fetchAllDrinkRecipes().then((response) => setData(response));
  }, []);

  useEffect(() => {
    drinkApiFunctions
      .fetchAllDrinkCategories()
      .then((response) => setAllFiltersToRender(response));
  }, []);

  useEffect(() => {
    setDrinksToRender(data.drinks);
  }, [data]);

  useEffect(() => {
    setFiltersToRender(allFiltersToRender.drinks);
  }, [allFiltersToRender]);

  const renderTwelveElements = (array) => {
    const eleven = 11;
    const finalArray = array
      .filter((_someDrink, index) => index <= eleven)
      .map((drink, index) => (
        <MainDrinkCards
          thumb={ drink.strDrinkThumb }
          title={ drink.strDrink }
          key={ index }
          index={ index }
          id={ drink.idDrink }
        />
      ));
    return finalArray;
  };

  const filterButton = (category) => {
    if (filtered === false) {
      // const oldArray = [...data.drinks];
      // const newArray = oldArray.filter((food) => food.strCategory === category);
      drinkApiFunctions
        .fetchFilterDrinkByCategory(category)
        .then((response) => setDrinksToRender(response.drinks));
      setFiltered(true);
    } else {
      setDrinksToRender(data.drinks);
      setFiltered(false);
    }
  };

  const resetDrinksToRender = () => {
    setDrinksToRender(data.drinks);
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
        onClick={ () => resetDrinksToRender() }
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
      {drinksToRender === undefined ? (
        <p>Loading</p>
      ) : (
        renderTwelveElements(drinksToRender)
      )}
      <Footer />
    </div>
  );
}

export default MainDrinks;
