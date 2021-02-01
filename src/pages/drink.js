import React, { useContext } from 'react';
import Header from '../components/Header';
import SearchHeaderBar from '../components/SearchHeaderBar';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';
import CardsDrink from '../components/CardsDrink';

function Drink() {
  const { showBtn, data } = useContext(RecipeContext);
  return (
    <div>
      <Header />
      { showBtn && <SearchHeaderBar /> }
      {
        (data.drink === 'erro' || data.drink === null)
          ? window.alert(
            'Sinto muito, não encontramos nenhuma receita para esses filtros.',
          )
          : (data.drink.length > 1) && <CardsDrink />
      }
      <Footer />
    </div>
  );
}

/*
 {
        (data.food === 'erro') && window.alert(
          'Sinto muito, não encontramos nenhuma receita para esses filtros.',
        )
      }
*/

export default Drink;
