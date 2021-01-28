import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Cards from '../components/cards';
import GlobalContext from '../context/GlobalContext';
import useFetch from '../hooks/useFetch';

export default function Foods() {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const { setDataFoods, dataFoods } = useContext(GlobalContext);
  const response = useFetch(url).data;

  const filter = () => {
    const filteredResponse = [];
    if (response !== null) {
      const { meals } = response;
      Object.entries(meals).forEach((meal, index) => {
        if (index < 12) {
          const { strMeal, strMealThumb } = meal[1];
          filteredResponse.push({ strMeal, strMealThumb });
        }
      });
    }
    return filteredResponse;
  };

  useEffect(() => {
    setDataFoods(filter());
  }, [response]);

  return (
    <div>
      {Cards(12, dataFoods)}
      <Footer />
    </div>
  );
}
