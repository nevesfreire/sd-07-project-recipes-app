import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as foodApiFunctions from '../services/foodApiFunctions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainCards from '../components/MainCards';
import RecipesContext from '../context/RecipesContext';

function MainRecipes(props) {
  const { location } = props;
  const { pathname } = location;
  const { setPathName, setRedirectByIngredients } = useContext(RecipesContext);
  const { foodsToRender, setFoodsToRender, foodData } = useContext(
    RecipesContext,
  );
  const [allFiltersToRender, setAllFiltersToRender] = useState([]);
  const [filtersToRender, setFiltersToRender] = useState([]);
  const [filtered, setFiltered] = useState(false);

  useEffect(() => {
    foodApiFunctions
      .fetchAllFoodCategories()
      .then((response) => setAllFiltersToRender(response));
  }, []);

  useEffect(() => {
    setRedirectByIngredients(false);
  });

  useEffect(() => {
    setPathName(pathname);
  });

  useEffect(() => {
    setFiltersToRender(allFiltersToRender.meals);
  }, [allFiltersToRender]);
  const renderTwelveElements = (array) => {
    if (array === null) {
      return alert(
        "Sinto muito, não encontramos nenhuma receita para esses filtros."
      );
    }

    if (array.length === 1) {
      return <Redirect to={ `/comidas/${array[0].idMeal}` } />;
    }
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
      setFoodsToRender(foodData.meals);
      setFiltered(false);
    }
  };

  const resetFoodsToRender = () => {
    setFoodsToRender(foodData.meals);
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
        onClick={() => resetFoodsToRender()}
      >
        All
      </button>
    );
    finalArray.push(buttonAll);
    return finalArray;
  };

  return (
    <div id="foodElements">
      <Header title="Comidas" />
      {filtersToRender === undefined ? (
        <p>Loading</p>
      ) : (
        <div className="filterButtons">{renderFilveFilters(filtersToRender)}</div>
      )}
      {foodsToRender === undefined ? (
        <p>Loading</p>
      ) : (
        <div id="foods">{renderTwelveElements(foodsToRender)}</div>
      )}
      <Footer />
    </div>
  );
}

MainRecipes.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.bool,
  }).isRequired,
};

export default MainRecipes;
