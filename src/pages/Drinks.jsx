import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Cards from '../components/cards';
import GlobalContext from '../context/GlobalContext';
import { FoodsDrinks } from './style';
import DrinkCategories from '../components/categories/DrinkCategories';

const { Container } = FoodsDrinks;
export default function Drinks() {
  const {
    setDataDrinks,
    dataDrinks,
  } = useContext(GlobalContext);

  const numberOfCards = 12;

  useEffect(() => {
    let ignore = false;
    function fetchDrinkList() {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
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
          if (!ignore) setDataDrinks(filter());
        }, []);
    }

    fetchDrinkList();
    return () => { ignore = true; };
  }, [setDataDrinks]);

  return (
    <Container>
      {/* <DrinkCategories /> */}
      {Cards(numberOfCards, dataDrinks)}
      <Footer />
    </Container>
  );
}
