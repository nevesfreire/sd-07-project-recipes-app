import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks({ ...props }) {
  return (
    <div>
      <Header title="Bebidas" isSearchable props={props} />
      <Footer />
    </div>
  );
}
export default Drinks;
