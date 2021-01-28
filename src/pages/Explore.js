import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import FlexContainer from '../components/FlexContainer';
import ButtonLarge from '../components/ButtonLarge';
import allActions from '../actions';

function Explore() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.changePageTitle('Explorar'));
  }, [dispatch]);

  return (
    <FlexContainer>
      <Header />
      <ButtonLarge data-testid="explore-food">Explorar Comidas</ButtonLarge>
      <ButtonLarge data-testid="explore-drinks">Explorar Bebidas</ButtonLarge>
    </FlexContainer>
  );
}

export default Explore;
