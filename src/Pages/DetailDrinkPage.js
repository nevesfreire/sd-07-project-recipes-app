import React from 'react';
import ButtonDetails from '../Components/ButtonDetails';
import DetailsDrink from '../Components/DetailsDrink';

function DetailDrinkPage() {
  return (
    <div>
      <DetailsDrink />
      <ButtonDetails type="bebida" />
    </div>
  );
}

export default DetailDrinkPage;
