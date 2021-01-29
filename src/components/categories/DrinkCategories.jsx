import React, { useEffect, useContext } from 'react';
import Buttons from '../buttons';
import GlobalContext from '../../context/GlobalContext';
import Styles from './Styles';

const { BtnBar } = Styles;

export default function DrinkCategories() {
  const numberOfCategories = 5;
  const {
    setDrinkCategories,
    drinkCategories,
  } = useContext(GlobalContext);

  useEffect(() => {
    let ignore = false;
    function fetchDrinkCategories() {
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
          if (!ignore) setDrinkCategories(filter());
        });
    }

    fetchDrinkCategories();
    return () => { ignore = true; };
  }, [setDrinkCategories]);

  return (
    <BtnBar>
      {Buttons(numberOfCategories, drinkCategories)}
    </BtnBar>
  );
}
