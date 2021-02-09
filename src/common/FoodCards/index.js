import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import NavigationButton from '../NavigationButton';

export default function FoodCards({ list }) {
  const zero = 0;
  const doze = 12;
  const history = useHistory();
  const goToDetails = (idMeal) => {
    history.push(`/comidas/${idMeal}`);
  };

  return (
    <div className="containerSize">
      {list.slice(zero, doze).map((e, i) => (
        <div className="recipeBox" key={ e.idMeal }>
          <div
            className="mealContainer"
            data-testid={ `${i}-card-name` }
          >
            <img
              data-testid={ `${i}-card-img` }
              src={ e.strMealThumb }
              alt="meail"
            />
            <h1>
              <NavigationButton
                testId={ `${i}-recipe-card` }
                goToDetails={ goToDetails }
                itemName={ e.strMeal }
                idMeal={ e.idMeal }
              />
            </h1>
          </div>
        </div>))}
    </div>
  );
}

FoodCards.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};
