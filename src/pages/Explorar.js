import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Explorar() {
  const [exploreRecipes, setExploreRecipes] = useState('');

  const isFalse = false;
  return (
    <div>
      <Header text="Explorar" search={ isFalse } />
      <div className="container__explore__btn">
        <button
          className="button-explore"
          type="button"
          data-testid="explore-food"
          onClick={ () => setExploreRecipes('foods') }
        >
          Explorar Comidas
        </button>
        <button
          className="button-explore"
          type="button"
          data-testid="explore-drinks"
          onClick={ () => setExploreRecipes('drinks') }
        >
          Explorar Bebidas
        </button>
      </div>
      {exploreRecipes === 'foods' && <Redirect to="/explorar/comidas" /> }
      {exploreRecipes === 'drinks' && <Redirect to="/explorar/bebidas" /> }
      <Footer />
    </div>
  );
}

export default Explorar;
