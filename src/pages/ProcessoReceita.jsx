import React, { useState, useContext } from 'react';
import CoffeAndCodeContext from '../context/CoffeeAndCodeContext';

function ProcessoReceita({ match: { params: { id } }, history }) {
  const {
    ingredientsAndMeasures,
    foodDetails,
  } = useContext(CoffeAndCodeContext)
  return (
    <div>

    </div>
  );
}

export default ProcessoReceita;
