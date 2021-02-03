import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { apiFoods } from '../services/Services';

function ExplorarComidas() {
  const [exploreRecipes, setExploreRecipes] = useState('');
  const [idRandom, setIdRadom] = useState();

  const exploreSurprise = async () => {
    const randomMeal = await apiFoods('random.php');
    setIdRadom(randomMeal[0].idMeal);
    setExploreRecipes('surprise');
  };

  const isFalse = false;
  return (
    <div>
      <Header text="Explorar Comidas" search={ isFalse } />
      <div className="container__explore__btn">
        <button
          className="button-explore"
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => setExploreRecipes('ingredient') }
        >
          Por Ingredientes
        </button>
        <button
          className="button-explore"
          type="button"
          data-testid="explore-by-area"
          onClick={ () => setExploreRecipes('area') }
        >
          Por Local de Origem
        </button>
        <button
          className="button-explore"
          type="button"
          data-testid="explore-surprise"
          onClick={ exploreSurprise }
        >
          Me Surpreenda!
        </button>
      </div>
      { exploreRecipes === 'ingredient'
        && <Redirect to="/explorar/comidas/ingredientes" />}
      { exploreRecipes === 'area' && <Redirect to="/explorar/comidas/area" />}
      { exploreRecipes === 'surprise' && <Redirect to={ `/comidas/${idRandom}` } />}
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
