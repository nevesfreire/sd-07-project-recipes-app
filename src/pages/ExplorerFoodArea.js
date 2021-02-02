import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';
import * as foodApiFunctions from '../services/foodApiFunctions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainCards from '../components/MainCards';

function ExplorerFoodArea() {
  const [foodData, setFoodData] = useState([]);
  const [selectedValue, setSelectedValue] = useState('all');
  const [allRegionFoodsToRender, setAllRegionFoodsToRender] = useState([]);
  const [allFiltersToRender, setAllFiltersToRender] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    foodApiFunctions.fetchAllFoodRecipes().then((response) => setFoodData(response));
  }, []);
  useEffect(() => {
    setAllRegionFoodsToRender(foodData.meals);
  }, [foodData]);
  useEffect(() => {
    foodApiFunctions
      .fetchAllFoodAreas()
      .then((response) => setAllFiltersToRender(response.meals));
  }, []);
  useEffect(() => {
    const resetFoodsToRender = () => {
      setAllRegionFoodsToRender(foodData.meals);
    };
    setLoading(true);
    if (selectedValue === 'all') {
      resetFoodsToRender();
    } else {
      foodApiFunctions
        .fetchFilterFoodByArea(selectedValue)
        .then((response) => setAllRegionFoodsToRender(response.meals));
    }
    setLoading(false);
  }, [selectedValue, foodData]);

  const regionSelected = (event) => {
    const { target } = event;
    const { value } = target;
    setSelectedValue(value);
  };

  const renderFilters = (array) => {
    const finalArray = array
      .map((filter, index) => (
        <option key={ index } value={filter.strArea} data-testid={ `${filter.strArea}-option` }>{filter.strArea}</option>
      ));
    const buttonAll = (
      <option key="all" value="all" data-testid="All-option">All</option>
    );
    finalArray.unshift(buttonAll);
    return finalArray;
  };
  const renderTwelveElements = (array) => {
    if (array === null) {
      return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
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
  return (
    <div>
      <Header title="Explorar Origem" />
      {allFiltersToRender === undefined ? (
        <p>Loading</p>
      ) : (
        <select value={ selectedValue } onChange={ (e) => regionSelected(e) } data-testid="explore-by-area-dropdown">
          {renderFilters(allFiltersToRender)}
        </select>
      )}
      {(allRegionFoodsToRender === undefined) || (loading === true) ? (
        <p>Loading</p>
      ) : (
        renderTwelveElements(allRegionFoodsToRender)
      )}
      <Footer />
    </div>
  );
}

export default ExplorerFoodArea;
