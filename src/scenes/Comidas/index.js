import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SearchBar from '../../common/SearchBar';
import { AppContext } from '../../context/AppContext';

import CategoryButton from '../../common/CategoryButton';
import NavigationButton from '../../common/NavigationButton';
import './style.css';

const Comidas = () => {
  const history = useHistory();
  const { mealsCategories, filteredMeals } = useContext(AppContext);
  const { meals } = filteredMeals;

  const goToDetails = (idMeal) => {
    history.push(`/comidas/${idMeal}`);
  };

  if (meals) {
    const firstItem = 0;
    const zero = 0;
    const doze = 12;
    if (meals.length === 1) {
      return (
        <div>
          <SearchBar />
          <CategoryButton
            categoryName="All"
            categoryType="all-meals"
          />
          {/* {mealsCategories.map((item, index) => (
            <CategoryButton
              key={ index }
              categoryName={ item.strCategory }
              categoryType="meals"
            />))} */}
          <div
            className="mealContainer"
            key={ meals[firstItem].idMeal }
            data-testid={ `${firstItem}-card-name` }
          >
            <img
              data-testid={ `${firstItem}-card-img` }
              src={ meals[firstItem].strMealThumb }
              alt="meail"
            />
            <h1>
              <NavigationButton
                testId={ `${firstItem}-recipe-card` }
                goToDetails={ goToDetails }
                itemName={ meals[firstItem].strMeal }
                idMeal={ meals[firstItem].idMeal }
              />
            </h1>
          </div>
        </div>
      );
    }
    return (
      <div>
        <SearchBar />
        <CategoryButton
          categoryName="All"
          categoryType="all-meals"
        />
        {mealsCategories.map((item, index) => (
          <CategoryButton
            key={ index }
            categoryName={ item.strCategory }
            categoryType="meals"
          />))}
        {filteredMeals.meals.slice(zero, doze).map((e, i) => (
          <div
            className="mealContainer"
            key={ e.idMeal }
            data-testid={ `${i}-card-name` }

          >
            <img data-testid={ `${i}-card-img` } src={ e.strMealThumb } alt="meail" />
            <h1>
              <NavigationButton
                testId={ `${i}-recipe-card` }
                goToDetails={ goToDetails }
                itemName={ e.strMeal }
                idMeal={ e.idMeal }
              />
            </h1>
          </div>))}
      </div>
    );
  }

  return (
    <>
      <SearchBar />
      <h1>Faça uma pesquisa</h1>
    </>
  );
};

export default Comidas;
