import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Header from '../../common/Header';
import './style.css';

const Comidas = () => {
  const history = useHistory();
  const { mealsData } = useContext(AppContext);

  if (mealsData.meals) {
    const zero = 0;
    const doze = 12;
    if (mealsData.meals.length === 1) {
      history.push(
        `/comidas/${mealsData.meals[0].idMeal}`,
      );
    }
    return (
      <div>
        {mealsData.meals.slice(zero, doze).map((e, i) => (
          <div
            className="mealContainer"
            key={ e.idMeal }
            data-testid={ `${i}-recipe-card` }
          >
            <img data-testid={ `${i}-card-img` } src={ e.strMealThumb } alt="meail" />
            <h1 data-testid={ `${i}-card-name` }>{e.strMeal}</h1>
          </div>))}
      </div>
    );
  }

  return (
    <div>
      <Header />
    </div>
  );
};

export default Comidas;
