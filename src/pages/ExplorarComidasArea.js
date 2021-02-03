import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import FoodsArea from '../Components/FoodsArea';

function ExplorarComidasArea() {
  const isTrue = true;
  return (
    <div>
      <Header text="Explorar Origem" search={ isTrue } />
      <FoodsArea />
      <Footer />
    </div>
  );
}

export default ExplorarComidasArea;
