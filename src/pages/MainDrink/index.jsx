import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Header, Footer, RecipeCard } from '../../components';
import { RecipesContext } from '../../context';

export default function MainDrink({ history }) {
  const { setDrinks, drinks } = useContext(RecipesContext);
  const TWELVE = 12;

  const fetchDrinks = async () => {
    try {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(URL).then((results) => results.json());
      setDrinks(response.drinks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDrinks();
  }, []);

  return (
    <div>
      <Header history={ history } title="Bebidas" />
      <main>
        {
          drinks.filter((_, index) => index < TWELVE)
            .map((drink, index) => (
              <RecipeCard
                key={ index }
                id={ index }
                meal={ drink }
              />
            ))
        }
      </main>
      <Footer />
    </div>
  );
}

MainDrink.propTypes = {
  history: PropTypes.shape().isRequired,
};
