import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import allActions from '../actions';

function ExploreMeals() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.changePageTitle('Explorar Comidas'));
  }, [dispatch]);

  return (
    <Header />
  );
}

export default ExploreMeals;
