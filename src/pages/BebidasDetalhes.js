import React, { useEffect, useState } from 'react';
import Details from '../components/Details';

function BebidasDetalhes() {
  const zero = 0;
  const [itemId, setItemId] = useState(zero);

  const getIdFromUrl = () => {
    let id = window.location.href;
    id = id.split('/').pop();
    console.log(typeof (id));
    setItemId(id);
  };

  useEffect(() => {
    getIdFromUrl();
  });
  return (
    <div>
      <Details itemId={ itemId } mealType="Drink" />
    </div>
  );
}

export default BebidasDetalhes;
