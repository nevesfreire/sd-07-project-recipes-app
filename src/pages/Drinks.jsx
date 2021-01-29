import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/cards';
import GlobalContext from '../context/GlobalContext';

export default function Drinks() {
  const {
    setDataDrinks,
    dataDrinks,
    setTitle,
    setSearchButton,
  } = useContext(GlobalContext);
  const numberOfCards = 12;

  useEffect(() => {
    setTitle('Bebidas');
    setSearchButton(true);
  }, [setTitle, setSearchButton]);

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((resp) => resp.json())
      .then(({ drinks }) => {
        const filter = () => {
          const filteredResponse = [];
          if (drinks !== null) {
            Object.entries(drinks).forEach((drink, index) => {
              if (index < numberOfCards) {
                const { strDrink, strDrinkThumb } = drink[1];
                filteredResponse.push({ name: strDrink, image: strDrinkThumb });
              }
            });
          }
          return filteredResponse;
        };
        setDataDrinks(filter());
      }, []);
  });

  return (
    <div>
      <Header />
      {Cards(numberOfCards, dataDrinks)}
      <Footer />
    </div>
  );
}
