import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import './style.css';

const Recomendation = ({ title }) => {
  const [recomendations, setRecomendations] = useState([]);
  console.log(recomendations);
  useEffect(() => {
    async function handleRecomendation() {
      if (title.includes('comidas')) {
        const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const response = await request.json();
        return setRecomendations(response.drinks);
      }
      const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const response = await request.json();
      return setRecomendations(response.meals);
    }
    handleRecomendation();
  });
  const SEIS = 6;
  return (
    <div>
      <h2>{`Recomendations - ${title}`}</h2>
      <div className="carousel">
        {title.includes('comidas') ? (
          <div className="carousel-card">
            {recomendations
              .filter((_, index) => index < SEIS)
              .map(({ strDrink, strDrinkThumb }, index) => (
                <div key={ strDrink }>
                  <Item className="cards">
                    <img
                      src={ strDrinkThumb }
                      alt={ strDrink }
                      data-testid={ `${index}-recomendation-card` }
                    />
                  </Item>
                  <h4 data-testid={ `${index}-recomendation-title` }>
                    {strDrink}
                  </h4>
                </div>
              ))}
          </div>
        ) : (
          <div className="carousel-card">
            {recomendations
              .filter((_, index) => index < SEIS)
              .map(({ strMeal, strMealThumb }, index) => (
                <div key={ strMeal }>
                  <Item className="cards">
                    <img
                      src={ strMealThumb }
                      alt={ strMeal }
                      data-testid={ `${index}-recomendation-card` }
                    />
                  </Item>
                  <h4 data-testid={ `${index}-recomendation-title` }>
                    {strMeal}
                  </h4>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

Recomendation.propTypes = { title: PropTypes.string.isRequired };

export default Recomendation;
