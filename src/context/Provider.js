import React, { useEffect, useState } from 'react';
import FoodAppContext from '../context/FoodAppContext'
import {mealsAPI, drinksAPI}  from '../services';

function Provider({ children }) {
  const [mealsData, setMealsData] = useState({});
  const [drinksData, setDrinksData] = useState({});

  const getMealsDrinks =  async () => {
    const { meals } = await mealsAPI();
    const { drinks } = await drinksAPI();
    
    setMealsData(meals);    
    setDrinksData(drinks);
  }

  useEffect(() => {
    getMealsDrinks();    
  }, []);

  const context = {
    mealsData,
    drinksData
  };

  return (
    <FoodAppContext.Provider value={context}>
      { children }
    </FoodAppContext.Provider>
  )
}

export default Provider;