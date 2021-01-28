import React from 'react';

import Footer from '../components/Footer';

function Foods() {
  const headerExist = document.querySelector('#headerNotLoaded');
  if (headerExist !== null) window.location.reload();
  return (
    <div>
      <span>Comidas</span>
      <Footer />
    </div>
  );
}

export default Foods;
