import React, { useEffect, useState } from 'react';

import Header from '../../common/Header';
import BottomBar from '../../common/BottomBar';

import { getAllLocations, getMeals, getFoodByArea } from '../../services/API';
import FoodCards from '../../common/FoodCards';

export default function ExplorarArea() {
  const [allLocations, setAllLocations] = useState([]);
  const [cardFoodList, setCardFoodList] = useState([]);
  useEffect(() => {
    const getLocations = async () => {
      const locations = await getAllLocations();
      setAllLocations(locations);
    };
    const getAllMeals = async () => {
      const cardList = await getMeals();
      setCardFoodList(cardList);
    };
    getAllMeals();
    getLocations();
  }, []);

  const filterByArea = async (area) => {
    let list = [];
    if (area === 'all') {
      list = await getMeals();
    } else {
      const response = await getFoodByArea(area);
      list = { meals: response };
    }
    setCardFoodList(list);
  };

  if (cardFoodList.meals) {
    return (
      <>
        <Header />
        <main>
          <section>
            <select
              data-testid="explore-by-area-dropdown"
              onChange={ ({ target }) => filterByArea(target.value) }
            >
              Selecione a Área:
              <option value="all" key="all" data-testid="All-option">All</option>
              {allLocations.map((location) => (
                <option
                  key={ location.strArea }
                  value={ location.strArea }
                  data-testid={ `${location.strArea}-option` }
                >
                  {location.strArea}
                </option>
              ))}
            </select>
          </section>
          <FoodCards list={ cardFoodList.meals } />
        </main>
        <BottomBar />
      </>
    );
  }
  return (
    <>
      <Header />
      <h1>Carregando...</h1>
      <BottomBar />
    </>
  );
}
