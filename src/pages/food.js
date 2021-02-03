import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchHeaderBar from '../components/SearchHeaderBar';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';
import ListCardsFood from '../components/ListCardsFood';

function Food() {
  const [loading, setLoading] = useState(false);
  const { showBtn, data, setData } = useContext(RecipeContext);
  const MAX_ARRAY = 12;
  const ZERO = 0;

  useEffect(() => {
    if (!data.food) setData({ ...data, food: [] });
    else if (data.food.length > ZERO) setLoading(true);
  }, [data.food]);

  const getAlert = () => {
    window.alert(
      'Sinto muito, não encontramos nenhuma receita para esses filtros.',
    );
  };

  const getLoading = () => {
    if (loading) {
      console.log(loading, data.food);
      const arrayFoods = [...data.food];
      if (arrayFoods.length > MAX_ARRAY) arrayFoods.length = MAX_ARRAY;
      return ListCardsFood(arrayFoods);
    }
    return 'Loading...';
  };

  return (
    <div>
      <Header />
      { showBtn && <SearchHeaderBar /> }
      {
        (data.food === 'erro' || data.food === null)
          ? getAlert()
          : getLoading()
      }
      <Footer />
    </div>
  );
}

export default Food;
