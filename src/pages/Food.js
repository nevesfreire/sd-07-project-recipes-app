import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Food({ ...props }) {
  return (
    <div>
      <Header title="Comidas" isSearchable props={props} />
      <Footer />
    </div>
  );
}
export default Food;
