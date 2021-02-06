import React, { useEffect, useState } from 'react';
import Details from '../components/Details';

function BebidasDetalhes() {
  const zero = 0;
  const [itemId, setItemId] = useState(zero);

  const getIdFromUrl = () => {
    let id = window.location.href;
    id = id.split('/').pop();
    setItemId(id);
  };

  useEffect(() => {
    getIdFromUrl();
  });
  return (
    <div className="detalhes-main">
      <Details itemId={ itemId } mealType="Drink" />
    </div>
  );
}

export default BebidasDetalhes;
