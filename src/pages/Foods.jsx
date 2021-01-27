import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function Foods() {
  const { a } = useContext(RecipesContext);

  return (<span>{a}</span>);
}

export default Foods;
