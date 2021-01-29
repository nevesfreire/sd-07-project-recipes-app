import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as drinkApiFunctions from '../services/drinkApiFunctions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainDrinkCards from '../components/MainDrinkCards';
import RecipesContext from '../context/RecipesContext';

function MainDrinks(props) {
  const { location } = props;
  const { pathname } = location;
  const { setPathName } = useContext(RecipesContext);
  const { drinksToRender, setDrinksToRender, drinkData } = useContext(RecipesContext);
  const [allFiltersToRender, setAllFiltersToRender] = useState([]);
  const [filtersToRender, setFiltersToRender] = useState([]);
  const [filtered, setFiltered] = useState(false);

  useEffect(() => {
    setPathName(pathname);
  });

  useEffect(() => {
    drinkApiFunctions
      .fetchAllDrinkCategories()
      .then((response) => setAllFiltersToRender(response));
  }, []);

  useEffect(() => {
    setFiltersToRender(allFiltersToRender.drinks);
  }, [allFiltersToRender]);

  const renderTwelveElements = (array) => {
    if (array === null) {
      return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (array.length === 1) {
      return <Redirect to={ `/bebidas/${array[0].idDrink}` } />;
    }
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
      setDrinksToRender(drinkData.drinks);
      setFiltered(false);
    }
  };

  const resetDrinksToRender = () => {
    setDrinksToRender(drinkData.drinks);
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

MainDrinks.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.bool,
  }).isRequired,
};

export default MainDrinks;
