import React, { useState, useEffect } from 'react';
import * as foodApiFunctions from '../services/foodApiFunctions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainCards from '../components/MainCards';

function MainRecipes() {
  const [data, setData] = useState([]);
  const [foodsToRender, setFoodsToRender] = useState([{ strMeal: 'Corba', strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg' }]);

  useEffect(() => {
    foodApiFunctions.fetchAllFoodRecipes().then((response) => setData(response));
  }, []);

  useEffect(() => {
    setFoodsToRender(data.meals);
  }, [data]);

  const renderTwelveElements = (array) => {
    const eleven = 11;
    const finalArray = array
      .filter((_someFood, index) => index <= eleven)
      .map((food, index) => (
        <MainCards thumb={ food.strMealThumb } title={ food.strMeal } key={ index } />
      ));
    return finalArray;
  };
  return (
    <div>
      <Header title="Comidas" />
      {foodsToRender === undefined ? <p>Loading</p> : renderTwelveElements(foodsToRender)}
      <Footer />
    </div>
  );
}

export default MainRecipes;
