import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import allActions from '../actions';

function ExploreMealsOrigin() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.renderSearchIcon());
    dispatch(allActions.changePageTitle('Explorar Origem'));
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default ExploreMealsOrigin;
