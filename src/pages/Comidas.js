import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardList from '../components/CardList';
import CategoryBar from '../components/CategoryBar';
import { fetchGlobalMeal, fetchMealCategory, fetchMealByCategory } from '../services/API';

function Comidas() {
  const [globalMeal, setGlobalMeal] = useState([]);
  const [mealCategories, setmealCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [filteredByCategory, setFilteredByCategory] = useState([]);

  const getGlobalMealData = async () => {
    const data = await fetchGlobalMeal();
    setGlobalMeal(data);
  };

  const getCategoriesMealData = async () => {
    const data = await fetchMealCategory();
    setmealCategories(data);
  };

  useEffect(() => {
    getGlobalMealData();
    getCategoriesMealData();
  }, []);

  useEffect(() => {
    async function getMealsByCategory() {
      setFilteredByCategory(await fetchMealByCategory(category));
    }
    getMealsByCategory();
  }, [category]);

  return (
    <div>
      <Header title="Comidas" hideSearchIcon="false" />
      <CategoryBar
        arrayOfCategories={ mealCategories }
        typeOfCategory="Meal"
        setCategory={ setCategory }
        category={ category }
      />
      <CardList
        arrayOfCard={ (category === ''
      || filteredByCategory === null)
          ? globalMeal : filteredByCategory }
        typeOfCard="Meal"
      />
      <Footer />
    </div>
  );
}

export default Comidas;
