import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { RecipesContext } from '../../context';
import { Header, Footer, RecipeCard } from '../../components';

export default function MainFood({ history }) {
  const { setMeals, meals } = useContext(RecipesContext);
  const TWELVE = 12;

  const fetchRandomFoods = async () => {
    try {
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const foods = await fetch(URL).then((response) => response.json());
      setMeals(foods.meals);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRandomFoods();
  }, []);

  return (
    <div>
      <Header history={ history } title="Comidas" />
      <main>
        {
          meals.filter((_, index) => index < TWELVE)
            .map((meal, index) => <RecipeCard key={ index } id={ index } meal={ meal } />)
        }
      </main>
      <Footer />
    </div>
  );
}

MainFood.propTypes = {
  history: PropTypes.shape().isRequired,
};
