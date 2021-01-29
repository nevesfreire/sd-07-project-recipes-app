import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/cards';
import GlobalContext from '../context/GlobalContext';

export default function Foods() {
  const {
    setDataFoods,
    dataFoods,
    setTitle,
    setSearchButton,
  } = useContext(GlobalContext);
  const numberOfCards = 12;

  useEffect(() => {
    setTitle('Comidas');
    setSearchButton(true);
  }, [setTitle, setSearchButton]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((resp) => resp.json())
      .then(({ meals }) => {
        const filter = () => {
          const filteredResponse = [];
          if (meals !== null) {
            Object.entries(meals).forEach((meal, index) => {
              if (index < numberOfCards) {
                const { strMeal, strMealThumb } = meal[1];
                filteredResponse.push({ name: strMeal, image: strMealThumb });
              }
            });
          }
          return filteredResponse;
        };
        setDataFoods(filter());
      }, []);
  });

  return (
    <div>
      <Header />
      {Cards(numberOfCards, dataFoods)}
      <Footer />
    </div>
  );
}
