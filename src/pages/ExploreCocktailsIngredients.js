import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import allActions from '../actions';
import { drinkIngredients, drinkByIngredient } from '../services/cocktailAPI';
import FlexContainer from '../components/FlexContainer';

function ExploreCocktailsIngredients() {
  const dispatch = useDispatch();
  const state = useSelector(({ mainpage }) => mainpage);
  const { isLoading, ingredients } = state;
  const history = useHistory();

  useEffect(() => {
    dispatch(allActions.changePageTitle('Explorar Ingredientes'));
    dispatch(allActions.getIngredients(drinkIngredients, false));
  }, [dispatch]);

  const handleClick = (ingredient) => {
    dispatch(allActions.saveIngredient(ingredient));
    dispatch(allActions.getDrinksByIngredient(drinkByIngredient, ingredient));
    history.push('/bebidas');
  };

  const renderIngredients = (ingredient, index) => {
    const MAX_NUMBER = 12;
    if (index < MAX_NUMBER) {
      return (
        <button
          type="button"
          className="card meals"
          onClick={ () => handleClick(ingredient.strIngredient1) }
          style={ { cursor: 'pointer' } }
          data-testid={ `${index}-ingredient-card` }
          key={ `card-${index}` }
        >
          <img
            className="card-img-top"
            key={ `ingredient-thumb-${index}` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
            alt="ingredient thumb"
            data-testid={ `${index}-card-img` }
          />
          <h2
            className="card-title"
            key={ ingredient.strIngredient1 }
            data-testid={ `${index}-card-name` }
          >
            {ingredient.strIngredient1}
          </h2>
        </button>
      );
    }
    return null;
  };

  if (isLoading) {
    return (<h1>Loading...</h1>);
  }

  return (
    <div>
      <Header />
      <FlexContainer>
        {ingredients.map((ingredient, index) => renderIngredients(ingredient, index))}
      </FlexContainer>
      <Footer />
    </div>
  );
}

export default ExploreCocktailsIngredients;
