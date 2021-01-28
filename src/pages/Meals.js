import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import allActions from '../actions';

function Meals() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.renderSearchIcon());
    dispatch(allActions.changePageTitle('Comidas'));
  }, [dispatch]);

  return (
    <Header />
  );
}

export default Meals;
