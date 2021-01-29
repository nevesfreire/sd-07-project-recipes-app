/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
      <main>
        <Link to="/explorar/comidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            type="button"
            data-testid="explore-by-area"
          >
            Por Local de Origem
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

export default ExploreFoodPage;
