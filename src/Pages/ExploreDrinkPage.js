/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import RecipesContext from '../context/RecipesContext';
import fetchRecipes from '../services/recipesApi';

function ExploreDrinkPage() {
  const { globalRecipes, setGlobalRecipes } = useContext(RecipesContext);
  const [isRandom, setIsRandom] = useState(false);

  useEffect(() => {
    async function fetchRandomRecipe() {
      if (isRandom) {
        const randomRecipe = await fetchRecipes('Bebidas', 'random');
        setGlobalRecipes(randomRecipe);
      }
    }
    fetchRandomRecipe();
  }, [isRandom]);

  if (isRandom && globalRecipes.drinks) {
    const id = globalRecipes.drinks[0].idDrink;
    return <Redirect to={ `/bebidas/${id}` } />;
  }

  return (
    <div>
      <Header title="Explorar Bebidas" />
      <main
        style={ {
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
        } }
      >
        <Link to="/explorar/bebidas/ingredientes">
          <Button
            style={ { marginTop: '30px' } }
            variant="info"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </Button>
        </Link>
        <Button
          style={ { marginTop: '30px' } }
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

export default ExploreDrinkPage;
