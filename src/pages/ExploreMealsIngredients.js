import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import allActions from '../actions';

function ExploreMealsIngredients() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.changePageTitle('Explorar Ingredientes'));
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default ExploreMealsIngredients;
