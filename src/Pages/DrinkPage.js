import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import RecipesContext from '../context/RecipesContext';

function DrinkPage() {
  const { globalRecipes } = useContext(RecipesContext);
  const [isFetching, setIsFetching] = useState(true);
  const [isOnlyOne, setIsOnlyOne] = useState(false);
  const [firstTwelveRecipes, setFirstTwelveRecipes] = useState([]);
  const twelve = 12;
  const zero = 0;
  useEffect(() => {
    if (globalRecipes.drinks !== undefined) {
      setIsFetching(false);
      if (globalRecipes.drinks !== null && globalRecipes.drinks.length === 1) {
        setIsOnlyOne(true);
      } else if (globalRecipes.drinks !== null) {
        setFirstTwelveRecipes(globalRecipes.drinks.slice(zero, twelve));
      }
    }
  }, [globalRecipes]);

  if (isOnlyOne) {
    const id = globalRecipes.drinks[0].idDrink;
    return <Redirect to={ `/bebidas/${id}` } />;
  }
  return (
    <div>
      <Header title="Bebidas" />
      {!isFetching
        ? (
          firstTwelveRecipes.map(
            (recipe, index) => (
              <Card key={ index } recipe={ recipe } index={ index } />
            ),
          )
        )
        : null}
      <Footer />
    </div>
  );
}

export default DrinkPage;
