import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchHeaderBar from '../components/SearchHeaderBar';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';
import ListCardsDrink from '../components/ListCardsDrink';
import { getCategoryDrinks } from '../services/Api';

function Drink() {
  const [loading, setLoading] = useState(false);
  const [arrayListDrink, setArrayListDrink] = useState([]);
  const { showBtn, data, setData } = useContext(RecipeContext);
  const MAX_ARRAY = 12;
  const FIVE = 5;
  const ZERO = 0;

  useEffect(() => {
    if (!data.drink) setData({ ...data, drink: [] });
    else if (data.drink.length > ZERO) setLoading(true);
  }, [data.drink]);

  useEffect(() => {
    const getListCategories = async () => {
      const listDrinkCategories = await getCategoryDrinks();
      listDrinkCategories.length = FIVE;
      setArrayListDrink(listDrinkCategories);
    };
    getListCategories();
  }, []);

  const getAlert = () => {
    window.alert(
      'Sinto muito, não encontramos nenhuma receita para esses filtros.',
    );
  };

  const getLoading = () => {
    if (loading) {
      const arrayDrinks = [...data.drink];
      if (arrayDrinks.length > MAX_ARRAY) arrayDrinks.length = MAX_ARRAY;
      return ListCardsDrink(arrayDrinks);
    }
    return 'Loading...';
  };

  const showListDrinksCategories = () => arrayListDrink.map((category) => (
    <div
      key={ category.strCategory }
      data-testid={ `${category.strCategory}-category-filter` }
    >
      <button type="button">
        {category.strCategory}
      </button>
    </div>
  ));

  return (
    <div>
      <Header />
      { showBtn && <SearchHeaderBar /> }

      {(arrayListDrink.length > ZERO) && showListDrinksCategories()}

      {
        (data.drink === 'erro' || data.drink === null)
          ? getAlert()
          : getLoading()
      }
      <Footer />
    </div>
  );
}

export default Drink;
