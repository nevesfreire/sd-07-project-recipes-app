import React from 'react';
import PropTypes from 'prop-types';
import { isObject } from 'lodash';

function ShowRecommended(props) {
  const {
    carouselPartition,
    carouselActiveIndex,
    carouselActiveIndex1,
    recommendation1,
    recommendation2,
  } = props;

  return (
    <div className="carousels-container">
      <div className="carousel slide" data-ride="carousel" id="carousel1">
        <div className="carousel-item active">
          {recommendation1.map((item, index) => {
            if (index === carouselActiveIndex) {
              return (
                <div
                  key={
                    item.strDrink !== undefined ? item.strDrink : item.idMeal
                  }
                  data-testid={ `${index}-recomendation-card` }
                  className="carousel-item active"
                >
                  <img
                    className="d-block w-100"
                    src={
                      item.strDrinkThumb !== undefined
                        ? item.strDrinkThumb
                        : item.strMealThumb
                    }
                    alt={
                      item.strDrink !== undefined ? item.strDrink : item.strMeal
                    }
                  />
                  <h5 data-testid={ `${index}-recomendation-title` }>
                    {item.strDrink !== undefined ? item.strDrink : item.strMeal}
                    {/* { item.strDrink } */}
                  </h5>
                </div>
              );
            }
            return (
              <div
                key={ item.idDrink !== undefined ? item.idDrink : item.idMeal }
                // key={ item.idDrink }
                data-testid={ `${
                  index + carouselActiveIndex1
                }-recomendation-card` }
                className="carousel-item"
              >
                <img
                  src={
                    item.strDrinkThumb !== undefined
                      ? item.strDrinkThumb
                      : item.strMealThumb
                  }
                  alt={
                    item.strDrink !== undefined ? item.strDrink : item.strMeal
                  }
                  //   src={ item.strDrinkThumb }
                  //   alt={ item.strDrink }
                  className="d-block w-100"
                />
                <h5 data-testid={ `${index}-recomendation-title` }>
                  { item.strDrink !== undefined ? item.strDrink : item.strMeal }
                  {/* { item.strDrink} */}
                </h5>
              </div>
            );
          })}
        </div>
      </div>
      <div className="carousel slide" data-ride="carousel" id="carousel2">
        <div className="carousel-inner">
          {recommendation2.map((item, index) => {
            if (index === carouselActiveIndex) {
              return (
                <div
                  key={ item.idDrink !== undefined ? item.idDrink : item.idMeal }
                  data-testid="1-recomendation-card"
                  className="carousel-item active"
                >
                  <img
                    className="d-block w-100"
                    src={
                      item.strDrinkThumb !== undefined
                        ? item.strDrinkThumb
                        : item.strMealThumb
                    }
                    alt={
                      item.strDrink !== undefined ? item.strDrink : item.strMeal
                    }
                    // src={ item.strDrinkThumb }
                    // alt={ item.strDrink }
                  />
                  <h5
                    data-testid={ `${
                      index + carouselPartition
                    }-recomendation-title` }
                  >
                    {item.strDrink !== undefined ? item.strDrink : item.strMeal}
                    {/* { item.strDrink } */}
                  </h5>
                </div>
              );
            }
            return (
              <div
                key={ item.idDrink !== undefined ? item.idDrink : item.idMeal }
                data-testid={ `${index + carouselPartition}-recomendation-card` }
                className="carousel-item"
              >
                <img
                  src={
                    item.strDrinkThumb !== undefined
                      ? item.strDrinkThumb
                      : item.strMealThumb
                  }
                  alt={
                    item.strDrink !== undefined ? item.strDrink : item.strMeal
                  }
                  //   src={ item.strDrinkThumb }
                  //   alt={ item.strDrink }
                  className="d-block w-100"
                />
                <h5
                  data-testid={ `${
                    index + carouselPartition
                  }-recomendation-title` }
                >
                  {item.strDrink !== undefined ? item.strDrink : item.strMeal}
                  {/* { item.strDrink } */}
                </h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

ShowRecommended.propTypes = {
  carouselPartition: PropTypes.number.isRequired,
  carouselActiveIndex: PropTypes.number.isRequired,
  carouselActiveIndex1: PropTypes.number.isRequired,
  recommendation1: PropTypes.arrayOf(isObject).isRequired,
  recommendation2: PropTypes.arrayOf(isObject).isRequired,
};

export default ShowRecommended;
