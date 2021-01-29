import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import allActions from '../actions';
import {mealIngredients} from '../services/mealAPI';

function ExploreMealsIngredients() {
  const dispatch = useDispatch();
  const state = useSelector(({ mainpage }) => mainpage);
  const { isLoading, ingredients } = state;

  useEffect(() => {
    dispatch(allActions.changePageTitle('Explorar Ingredientes'));
    dispatch(allActions.getIngredients(mealIngredients));
  }, [dispatch]);
  
  const renderIngredients = (ingredient, index) => {
    const MAX_NUMBER = 12;
    if (index < MAX_NUMBER) {
      return (
        <Link to={ `/comidas` } key={ `link-${index}` }>
          <div
            data-testid={ `${index}-ingredient-card` }
            key={ `card-${index}` }
          >
            <img
              key={ `ingredient-thumb-${index}` }
              src={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`}
              alt="ingredient thumb"
              data-testid={ `${index}-card-img` }
            />
            <h2
              key={ ingredient.strIngredient }
              data-testid={ `${index}-card-name` }
            >
              {ingredient.strIngredient}
            </h2>
          </div>
        </Link>
      );
    }
    return null;
  };

  if (isLoading) {
    return (<h1>Loading...</h1>)
  }
  return (
    <div>
      <Header />
      {ingredients.map((ingredient, index) => renderIngredients(ingredient, index))}
      <Footer />
    </div>
  );
}

export default ExploreMealsIngredients;
