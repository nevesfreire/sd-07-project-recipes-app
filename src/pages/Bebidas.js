import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CardList from '../components/CardList';
import Footer from '../components/Footer';
import CategoryBar from '../components/CategoryBar';
import { fetchGlobalDrink,
  fetchDrinkCategory,
  fetchDrinkByCategory } from '../services/API';

function Bebidas() {
  const [globalDrink, setGlobalDrink] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [filteredByCategory, setFilteredByCategory] = useState([]);
  const magicNumberZero = 0;

  const getGlobalDrinkData = async () => {
    const data = await fetchGlobalDrink();
    setGlobalDrink(data);
  };

  const getCategoriesDrinkData = async () => {
    const data = await fetchDrinkCategory();
    setDrinkCategories(data);
  };

  useEffect(() => {
    getGlobalDrinkData();
    getCategoriesDrinkData();
  }, []);

  useEffect(() => {
    console.log(category, 'pagina de bebidas');
    // const regexCategory = category.replace(/ /g, '_');
    // const regexCategory = category.split(' ').join('_');
    async function getDrinksByCategory() {
      const data = await fetchDrinkByCategory(category);
      console.log(data, 'arquivo bebidas');
      const dataDrinks = data;
      if (dataDrinks.length > magicNumberZero) setFilteredByCategory(dataDrinks);
      // setFilteredByCategory(await fetchDrinkByCategory(regexCategory));
    }
    getDrinksByCategory();
  }, [category]);

  return (
    <div>
      <Header title="Bebidas" hideSearchIcon="false" />
      <CategoryBar
        arrayOfCategories={ drinkCategories }
        typeOfCategory="Drink"
        setCategory={ setCategory }
        category={ category }
      />
      <CardList
        arrayOfCard={ (category === ''
      || filteredByCategory === null)
          ? globalDrink : filteredByCategory }
        typeOfCard="Drink"
      />
      <Footer />
    </div>
  );
}

export default Bebidas;
