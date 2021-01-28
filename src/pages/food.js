import React, { useContext } from 'react';
import Header from '../components/Header';
import SearchHeaderBar from '../components/SearchHeaderBar';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';

function Food() {
  const { showBtn } = useContext(RecipeContext);
  return (
    <div>
      <Header />
      { showBtn && <SearchHeaderBar /> }
      <Footer />
    </div>
  );
}

export default Food;
