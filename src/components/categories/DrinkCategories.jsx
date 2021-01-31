import React, { useEffect, useContext, useCallback } from 'react';
import Buttons from '../buttons';
import GlobalContext from '../../context/GlobalContext';
import './Styles.css';

export default function DrinkCategories() {
  const numberOfCategories = 5;
  const {
    setDrinkCategories,
    drinkCategories,
  } = useContext(GlobalContext);

  const fetchDrinkCategories = useCallback(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then(({ drinks }) => {
        const filter = () => {
          const filteredResponse = [];
          if (drinks !== null) {
            Object.entries(drinks).forEach((drink, index) => {
              if (index < numberOfCategories) {
                const { strCategory } = drink[1];
                filteredResponse.push(strCategory);
              }
            });
          }
          return filteredResponse;
        };
        setDrinkCategories(filter());
      }, []);
  }, [setDrinkCategories]);

  useEffect(() => {
    fetchDrinkCategories();
  }, [fetchDrinkCategories]);

  return (
    <div className="drinks-categories" id="drinks">
      {Buttons(numberOfCategories, drinkCategories)}
    </div>
  );
}
