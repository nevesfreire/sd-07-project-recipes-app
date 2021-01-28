import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import allActions from '../actions';

function Explore() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.changePageTitle('Explorar'));
  }, [dispatch]);

  return (
    <Header />
  );
}

export default Explore;
