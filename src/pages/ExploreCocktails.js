import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import allActions from '../actions';

function ExploreCocktails() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.changePageTitle('Explorar Bebidas'));
  }, [dispatch]);

  return (
    <Header />
  );
}

export default ExploreCocktails;
