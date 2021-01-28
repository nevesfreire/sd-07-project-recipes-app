import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchAllRecipes } from '../../API/apiMeals';
import { fetchAllCocktails } from '../../API/apiCocktails';
import RecipeContext from '../../Context/RecipeContext';
import CardFood from '../CardFood';
import CategoryList from '../CategoryList';

const MainScreen = (props) => {
  const { page } = props;
  const { dispatch } = useContext(RecipeContext);
  const {
    state: { mealsData, cocktailsData },
  } = useContext(RecipeContext);

  useEffect(() => {
    fetchAllRecipes().then((arrayLimit) => dispatch({
      type: 'SET_MEALS',
      data: arrayLimit,
    }));
    fetchAllCocktails().then((arrayLimit) => dispatch({
      type: 'SET_COCKTAILS',
      data: arrayLimit,
    }));
  }, [dispatch]);

  const mealsDoc = () => (
    <div>
      {mealsData.map(({ strMealThumb, strMeal }, index) => (
        <CardFood
          key={ strMeal }
          index={ index }
          foodName={ strMeal }
          thumb={ strMealThumb }
        />
      ))}
    </div>
  );

  const cockTailsDoc = () => (
    <div>
      {cocktailsData.map(({ strDrinkThumb, strDrink }, index) => (
        <CardFood
          key={ strDrink }
          index={ index }
          foodName={ strDrink }
          thumb={ strDrinkThumb }
        />
      ))}
    </div>
  );

  return (
    <div>
      {page === 'comidas' ? mealsDoc() : cockTailsDoc()}
      <CategoryList page={ page } />
    </div>
  );
};

export default MainScreen;

MainScreen.propTypes = {
  page: PropTypes.string.isRequired,
};
