import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropTypes from 'prop-types';
// import Paper from '@material-ui/core/Paper';
import '../css/card.css';
import { propTypes } from 'react-bootstrap/esm/Image';

// stackOverflow -> https://stackovetextrflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
const findMatch = (string, object) => (
  Object.keys(object).find((key) => key.match(string))
);

const recipeImg = (recipeThumb, recipeIndex) => (
  <img
    src={ recipeThumb }
    alt="recipe-img"
    data-testid={ `${recipeIndex}-card-img` }
    className="carousel-img"
  />
);

const recipeTextData = (recipeName, recipeIndex) => (
  <h3 data-testid={ `${recipeIndex}-recomendation-title` } className="card-title">
    {recipeName}
  </h3>
);

export default function RecomendationCarousel({ recomendations, str }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };
  const maxRecomend = 6;
  return (
    <Slider { ...settings } className="carousel-container">
      {recomendations
        .filter((_recipe, index) => index < maxRecomend)
        .map((recomendation, index) => {
          const Name = recomendation[findMatch(str, recomendation)];
          const Thumb = recomendation[findMatch(/Thumb/, recomendation)];
          const Test = 'recomendation-card';

          return (
            // <Paper  className="paper-style carousel-card" elevation={ 6 }>
            <div
              key={ index }
              className="carousel-card"
              data-testid={ `${index}-${Test}` }
            >
              {recipeImg(Thumb, index)}
              {recipeTextData(Name, index)}
            </div>
            // </Paper>
          );
        })}
    </Slider>
  );
}

RecomendationCarousel.propTypes = {
  recomendations: PropTypes.arrayOf(propTypes.object).isRequired,
  str: PropTypes.string.isRequired,
};
