import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
// import Item from './Item';
// import './style.css';

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
          <Carousel className="carousel-card">
            {recomendations
              .filter((_, index) => index < SEIS)
              .map(({ strDrink, strDrinkThumb }, index) => (
                <Carousel.Item key={ strDrink }>
                  <img
                    className="d-block w-100"
                    src={ strDrinkThumb }
                    alt={ strDrink }
                    data-testid={ `${index}-recomendation-card` }
                  />
                  <Carousel.Caption>
                    <h4 data-testid={ `${index}-recomendation-title` }>
                      {strDrink}
                    </h4>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
          </Carousel>
        ) : (
          <Carousel className="carousel-card">
            {recomendations
              .filter((_, index) => index < SEIS)
              .map(({ strMeal, strMealThumb }, index) => (
                <Carousel.Item key={ strMeal }>
                  <img
                    className="d-block w-100"
                    src={ strMealThumb }
                    alt={ strMeal }
                    data-testid={ `${index}-recomendation-card` }
                  />
                  <Carousel.Caption>
                    <h4 data-testid={ `${index}-recomendation-title` }>
                      {strMeal}
                    </h4>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};

Recomendation.propTypes = { title: PropTypes.string.isRequired };

export default Recomendation;
