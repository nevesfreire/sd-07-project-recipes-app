import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import RecipesContext from '../context/RecipesContext';

function FoodPage() {
  const { globalRecipes } = useContext(RecipesContext);
  const [isFetching, setIsFetching] = useState(true);
  const [isOnlyOne, setIsOnlyOne] = useState(false);
  const [firstTwelveRecipes, setFirstTwelveRecipes] = useState([]);
  const twelve = 12;
  const zero = 0;
  useEffect(() => {
    if (globalRecipes.meals !== undefined) {
      setIsFetching(false);
      if (globalRecipes.meals !== null && globalRecipes.meals.length === 1) {
        setIsOnlyOne(true);
      } else if (globalRecipes.meals !== null) {
        setFirstTwelveRecipes(globalRecipes.meals.slice(zero, twelve));
      }
    }
  }, [globalRecipes]);

  if (isOnlyOne) {
    const id = globalRecipes.meals[0].idMeal;
    return <Redirect to={ `/comidas/${id}` } />;
  }
  return (
    <div>
      <Header title="Comidas" />
      {!isFetching
        ? (
          firstTwelveRecipes.map(
            (recipe, index) => (
              <Card key={ index } recipe={ recipe } index={ index } isFood />
            ),
          )
        )
        : null}
      <Footer />
    </div>
  );
}

export default FoodPage;
