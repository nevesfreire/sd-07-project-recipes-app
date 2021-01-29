import React, { useEffect, useContext, useCallback } from 'react';
import Buttons from '../buttons';
import GlobalContext from '../../context/GlobalContext';
import Styles from './Styles';

const { BtnBar } = Styles;

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
      });
  }, [setFoodCategories]);

  useEffect(() => {
    fetchFoodCategories();
  }, [fetchFoodCategories]);

  return (
    <BtnBar>
      {Buttons(numberOfCategories, foodCategories)}
    </BtnBar>
  );
}
