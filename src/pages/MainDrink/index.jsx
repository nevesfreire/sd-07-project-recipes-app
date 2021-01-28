import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Header, Footer, RecipeCard } from '../../components';
import { RecipesContext } from '../../context';

export default function MainDrink({ history }) {
  const { setDrinks, drinks } = useContext(RecipesContext);

  const fetchDrinks = async () => {
    try {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const drinks = await fetch(URL).then(response => response.json());
      setDrinks(drinks.drinks);
    }
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDrinks();
  }, [])

  return (
    <div>
      <Header history={ history } title="Bebidas" />
      <main>
        {
          drinks.filter((_, index) => index < 12 )
            .map((drink, index) => <RecipeCard key={index} id={index} meal={drink} />)
        }
      </main>
      <Footer />
    </div>
  );
}

MainDrink.propTypes = {
  history: PropTypes.shape().isRequired,
};
