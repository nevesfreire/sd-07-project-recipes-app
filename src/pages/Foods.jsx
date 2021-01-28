import React from 'react';

function Foods() {
  const headerExist = document.querySelector('#headerNotLoaded');
  if (headerExist !== null) window.location.reload();
  return (
    <div>
      <span>Comidas</span>
    </div>
  );
}

export default Foods;
