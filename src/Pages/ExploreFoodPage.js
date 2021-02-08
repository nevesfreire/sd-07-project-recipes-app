/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import RecipesContext from '../context/RecipesContext';
import fetchRecipes from '../services/recipesApi';

function ExploreFoodPage() {
  const { globalRecipes, setGlobalRecipes } = useContext(RecipesContext);
  const [isRandom, setIsRandom] = useState(false);

  useEffect(() => {
    async function fetchRandomRecipe() {
      if (isRandom) {
        const randomRecipe = await fetchRecipes('Comidas', 'random');
        setGlobalRecipes(randomRecipe);
      }
    }
    fetchRandomRecipe();
  }, [isRandom]);

  if (isRandom && globalRecipes.meals) {
    const id = globalRecipes.meals[0].idMeal;
    console.log(id);
    return <Redirect to={ `/comidas/${id}` } />;
  }

  return (
    <div>
      <Header title="Explorar Comidas" />
      <main
        style={ {
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
        } }
      >
        <Link to="/explorar/comidas/ingredientes">
          <Button
            style={ { marginTop: '30px' } }
            variant="info"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </Button>
        </Link>
        <Link to="/explorar/comidas/area">
          <Button
            style={ { marginTop: '30px' } }
            variant="info"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </Button>
        </Link>
        <Button
          variant="info"
          data-testid="explore-surprise"
          onClick={ () => setIsRandom(true) }
        >
          Me Surpreenda!
        </Button>
      </main>
      <Footer />
    </div>
  );
}

export default ExploreFoodPage;
