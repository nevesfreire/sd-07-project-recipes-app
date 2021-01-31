import React, { useEffect, useContext, useCallback } from 'react';
import Buttons from '../buttons';
import GlobalContext from '../../context/GlobalContext';
import './Styles.css';

export default function FoodCategories() {
  const numberOfCategories = 5;
  const {
    setFoodCategories,
    foodCategories,
  } = useContext(GlobalContext);

  const fetchFoodCategories = useCallback(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then(({ meals }) => {
        const filter = () => {
          const filteredResponse = [];
          if (meals !== null) {
            Object.entries(meals).forEach((meal, index) => {
              if (index < numberOfCategories) {
                const { strCategory } = meal[1];
                filteredResponse.push(strCategory);
              }
            });
          }
          return filteredResponse;
        };
        setFoodCategories(filter());
      }, []);
  }, [setFoodCategories]);

  useEffect(() => {
    fetchFoodCategories();
  }, [fetchFoodCategories]);

  return (
<<<<<<< HEAD
    <div className="foods-categories">
=======
    <div className="foods-categories" id="foods">
>>>>>>> f8e85995fd53af4499bbc035c0595f3e72f4a622
      {Buttons(numberOfCategories, foodCategories)}
    </div>
  );
}
