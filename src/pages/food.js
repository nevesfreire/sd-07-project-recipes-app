import React, { useContext } from 'react';
import Header from '../components/Header';
import SearchHeaderBar from '../components/SearchHeaderBar';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';
import CardsFood from '../components/CardsFood';

function Food() {
  const { showBtn, data } = useContext(RecipeContext);
  return (
    <div>
      <Header />
      { showBtn && <SearchHeaderBar /> }
      {
        (data.food === 'erro' || data.food === null)
          ? window.alert(
            'Sinto muito, não encontramos nenhuma receita para esses filtros.',
          )
          : (data.food.length > 1) && <CardsFood />
      }
      <Footer />
    </div>
  );
}

export default Food;
