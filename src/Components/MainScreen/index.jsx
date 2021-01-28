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
  const {
    state: { search: { categoryFilterDrinks, categoryFilterMeals } },
  } = useContext(RecipeContext);

  useEffect(() => {
    fetchAllRecipes('', categoryFilterMeals).then((arrayLimit) => dispatch({
      type: 'SET_MEALS',
      data: arrayLimit,
    }));
    fetchAllCocktails('', categoryFilterDrinks).then((arrayLimit) => dispatch({
      type: 'SET_COCKTAILS',
      data: arrayLimit,
    }));
  }, [dispatch, categoryFilterDrinks, categoryFilterMeals]);

  const mealsDoc = () => (
    <div>
      {mealsData.map(({ strMealThumb, strMeal, idMeal }, index) => (
        <CardFood
          idFood={ idMeal }
          page={ page }
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
      {cocktailsData.map(({ strDrinkThumb, strDrink, idDrink }, index) => (
        <CardFood
          idFood={ idDrink }
          page={ page }
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
