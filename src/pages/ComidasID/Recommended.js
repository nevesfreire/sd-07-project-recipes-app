import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Recommended({ suggestions }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };
  const five = 5;

  let strImgPath;
  let strTitle;

  if (suggestions[0].strDrink) {
    strImgPath = 'strDrinkThumb';
    strTitle = 'strDrink';
  } else {
    strImgPath = 'strMealThumb';
    strTitle = 'strMeal';
  }

  return (
    <div className="slider">
      <h2> Multiple items </h2>
      <Slider { ...settings }>
        {suggestions.map((elem, index) => {
          if (index > five) return null;
          return (
            <div data-testid={ `${index}-recomendation-card` } key={ index }>
              <img alt="" src={ elem[strImgPath] } />
              <p data-testid={ `${index}-recomendation-title` }>{ elem[strTitle] }</p>
            </div>);
        })}
      </Slider>
    </div>
  );
}

const mapStateToProps = (state) => ({
  meals: state.foodMeals.meals,
  drinks: state.cocktailsDrinks.cocktails,
});

export default connect(mapStateToProps)(Recommended);
