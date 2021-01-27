import React, { useState, useEffect } from 'react';
import * as foodApiFunctions from '../services/foodApiFunctions';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MainRecipes() {
  const [data, setData] = useState([]);
  const [ foodsToRender, setFoodsToRender ] = useState([]);

  useEffect(() => {
    foodApiFunctions.fetchAllFoodRecipes().then((response) => setData(response));
  }, []);

  useEffect(() => {
    setFoodsToRender(data.meals);
  }, [data]);
  return (
    <div>
      <Header title="Comidas" />
      <Footer />
    </div>
  );
}

export default MainRecipes;
