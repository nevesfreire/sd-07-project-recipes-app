import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import BottomBar from '../../common/BottomBar';
import { AppContext } from '../../context/AppContext';

import CategoryPanel from '../../common/CategoryPanel';
import NavigationButton from '../../common/NavigationButton';
import Header from '../../common/Header';
import './style.css';

const Comidas = () => {
  const history = useHistory();
  const { filteredMeals, isUsingSearchBar, mealsCategories } = useContext(AppContext);
  console.log(filteredMeals);
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
        <Header />
        <CategoryPanel categoryType="meals" categoryList={ mealsCategories } />
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
        <BottomBar />
      </div>
    );
  }

  return <h1>Loading...</h1>;
};

export default Comidas;
