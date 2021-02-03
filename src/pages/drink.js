import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchHeaderBar from '../components/SearchHeaderBar';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';
import ListCardsDrink from '../components/ListCardsDrink';

function Drink() {
  const [loading, setLoading] = useState(false);
  const { showBtn, data, setData } = useContext(RecipeContext);
  const MAX_ARRAY = 12;
  const ZERO = 0;

  useEffect(() => {
    if (!data.drink) setData({ ...data, drink: [] });
    else if (data.drink.length > ZERO) setLoading(true);
  }, [data.drink]);

  const getAlert = () => {
    window.alert(
      'Sinto muito, não encontramos nenhuma receita para esses filtros.',
    );
  };

  const getLoading = () => {
    if (loading) {
      console.log(loading, data.drink);
      const arrayDrinks = [...data.drink];
      if (arrayDrinks.length > MAX_ARRAY) arrayDrinks.length = MAX_ARRAY;
      return ListCardsDrink(arrayDrinks);
    }
    return 'Loading...';
  };

  return (
    <div>
      <Header />
      { showBtn && <SearchHeaderBar /> }

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
