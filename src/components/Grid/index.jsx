import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.css';

import Context from '../../Context';
import Meals from '../../services/meals-api';
import Drinks from '../../services/cocktails-api';

const Grid = ({ page }) => {
  const {
    mealsData,
    setMealsData,
    mealsCategoryList,
    setMealsCategoryList,
    mealsFilteredData,
    handleClickCategoryMeals,
  } = useContext(Context).meal;
  const {
    drinksData,
    setDrinksData,
    drinksCategoryList,
    setDrinksCategoryList,
    drinksFilteredData,
    handleClickCategoryDrinks,
  } = useContext(Context).drink;

  useEffect(() => {
    const amountToShow = 12;

    const urlParams = new URLSearchParams(window.location.search);
    const ing = urlParams.get('ing');

    if (page === 'meals' && ing) {
      Meals.searchMealsByIngredient(ing, amountToShow)
        .then((res) => setMealsData(res))
        .catch((err) => console.log(err));
    }

    if (page === 'drinks' && ing) {
      Drinks.searchCocktailsByIngredient(ing, amountToShow)
        .then((res) => setDrinksData(res))
        .catch((err) => console.log(err));
    }

    if (page === 'meals' && !ing) {
      Meals.getMeals(amountToShow)
        .then((res) => setMealsData(res))
        .catch((err) => console.log(err));
    }

    if (page === 'drinks' && !ing) {
      Drinks.getCocktails(amountToShow)
        .then((res) => setDrinksData(res))
        .catch((err) => console.log(err));
    }
  }, [page, setMealsData, setDrinksData]);

  useEffect(() => {
    const categoriesAmountToShow = 5;

    if (page === 'meals') {
      Meals.getMealCategoryList(categoriesAmountToShow)
        .then((res) => setMealsCategoryList(res))
        .catch((err) => console.log(err));
    }

    if (page === 'drinks') {
      Drinks.getCocktailCategoryList(categoriesAmountToShow)
        .then((res) => setDrinksCategoryList(res))
        .catch((err) => console.log(err));
    }
  }, [page, setMealsCategoryList, setDrinksCategoryList]);

  const loadingData = () => {
    if (page === 'meals') {
      return mealsData.length || mealsCategoryList.length;
    }

    return drinksData.length || drinksCategoryList.length;
  };

  if (!loadingData()) {
    return <h1>Loading meals...</h1>;
  }

  if (page === 'meals') {
    return (
      <>
        <div>
          <Link to="/bebidas">Bebidas</Link>

          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ () => handleClickCategoryMeals('All') }
          >
            All
          </button>
          {
            mealsCategoryList.map(({ strCategory }) => (
              <button
                type="button"
                key={ strCategory }
                data-testid={ `${strCategory}-category-filter` }
                onClick={ () => handleClickCategoryMeals(strCategory) }
              >
                { strCategory}
              </button>
            ))
          }
        </div>
        <div className="grid-list">
          {
            mealsFilteredData.map(({ idMeal, strMeal, strMealThumb }, index) => (
              <Link
                to={ `/comidas/${idMeal}` }
                key={ idMeal }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  className="recipe-img"
                  width="150"
                  src={ strMealThumb }
                  alt="meal"
                  data-testid={ `${index}-card-img` }
                />
                <h2 data-testid={ `${index}-card-name` }>
                  {strMeal}
                </h2>
              </Link>
            ))
          }
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <Link to="/comidas">Comidas</Link>

        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => handleClickCategoryDrinks('All') }
        >
          All
        </button>
        {
          drinksCategoryList.map(({ strCategory }) => (
            <button
              type="button"
              key={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => handleClickCategoryDrinks(strCategory) }
            >
              { strCategory}
            </button>
          ))
        }
      </div>
      <div className="grid-list">
        {
          drinksFilteredData.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
            <Link
              to={ `/bebidas/${idDrink}` }
              key={ idDrink }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                className="recipe-img"
                width="150"
                src={ strDrinkThumb }
                alt="drink"
                data-testid={ `${index}-card-img` }
              />
              <h2 data-testid={ `${index}-card-name` }>
                {strDrink}
              </h2>
            </Link>
          ))
        }
      </div>
    </>
  );
};

Grid.propTypes = { page: PropTypes.string.isRequired };

export default Grid;
