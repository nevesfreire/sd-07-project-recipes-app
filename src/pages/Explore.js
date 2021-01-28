import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import FlexContainer from '../components/FlexContainer';
import ButtonLarge from '../components/ButtonLarge';
import allActions from '../actions';
import { useHistory } from 'react-router-dom';

function Explore(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.changePageTitle('Explorar'));
  }, [dispatch]);

  const history = useHistory();

  function handleClick(e, url) {
    e.preventDefault();
    history.push(`/explorar/${url}`);
  }

  return (
    <FlexContainer>
      <Header />
      <ButtonLarge
        data-testid="explore-food"
        onClick={ (e) => handleClick(e, 'comidas') }
      >
        Explorar Comidas
      </ButtonLarge>
      <ButtonLarge
        data-testid="explore-drinks"
        onClick={ (e) => handleClick(e, 'bebidas') }
      >
        Explorar Bebidas
      </ButtonLarge>
    </FlexContainer>
  );
}

export default Explore;
