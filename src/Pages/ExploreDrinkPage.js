/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
      <main>
        <Link to="/explorar/bebidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => setIsRandom(true) }
        >
          Me Surpreenda!
        </button>
      </main>
      <Footer />
    </div>
  );
}

export default ExploreDrinkPage;
