import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Redirect } from 'react-router-dom';

import RecipeCard from '../RecipeCard';

import { StyledCardDeck, StyledSpinner } from './styles';

export default function RecipeCardList() {
  const { pathname } = useLocation();
  const { data, filterOrigin, isFetching } = useSelector((state) => state.recipes);
  const START_INDEX = 0;
  const END_INDEX = 12; // 12 cards - 12 not included

  if (filterOrigin === 'searchbar') {
    if (!data.length) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (data.length === 1) {
      return <Redirect to={ `${pathname}/${data[0].id}` } />;
    }
  }

  if (isFetching) {
    return <StyledSpinner animation="grow" />;
  }
  return (
    <StyledCardDeck>
      { data.slice(START_INDEX, END_INDEX)
        .map(({ id, name, image }, index) => (
          <RecipeCard key={ id } cardInfo={ { id, name, image, index } } />
        ))}
    </StyledCardDeck>
  );
}
