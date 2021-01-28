import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import allActions from '../actions';

function FavoriteRecipes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.changePageTitle('Receitas Favoritas'));
  }, [dispatch]);

  return (
    <Header />
  );
}

export default FavoriteRecipes;
