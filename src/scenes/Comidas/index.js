import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SearchBar from '../../common/SearchBar';
import { AppContext } from '../../context/AppContext';

import CategoryButton from '../../common/CategoryButton';
import NavigationButton from '../../common/NavigationButton';
import './style.css';

const Comidas = () => {
  const history = useHistory();
  const { mealsCategories, filteredMeals, isUsingSearchBar } = useContext(AppContext);

  const goToDetails = (idMeal) => {
    history.push(`/comidas/${idMeal}`);
  };

  if (filteredMeals.meals) {
    const zero = 0;
    const doze = 12;
    if (filteredMeals.meals.length === 1 && isUsingSearchBar) {
      goToDetails(filteredMeals.meals[0].idMeal);
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
    <h1>Faça uma pesquisa</h1>
  );
};

export default Comidas;
