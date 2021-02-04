import React, { useContext } from 'react';
import context from '../contextAPI/context';

function Cards() {
  const { data } = useContext(context);
  const MAX_ARRAY = 12;
  const array = [...data];
  if (array.length > MAX_ARRAY) array.length = MAX_ARRAY;
  return (
    <ListCards />
  );
}

export default Cards;
