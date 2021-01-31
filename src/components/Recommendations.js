import React from 'react';
import Slider from "react-slick";

function Recommendations({ api }) {
  const startPosition = 0;
  const lastPosition = 6;
  const firstSixItems = api.slice(startPosition, lastPosition);

  return (
    <div >
      <Slider
        dots={ true }
        infinite={ true }
        speed={ 1000 }
        slidesToScroll={ 1 }
        arrows={ true }
        slidesToShow={ 2 }
      >
       {  firstSixItems.map((card, index) => {
         if (card.strDrink) {
          return (
            <div key={ index } data-testid={ `${index}-recomendation-card` }>
              <img src={ card.strDrinkThumb } width="100px" />
              <h5>{ card.strCategory }</h5>
              <h4>{ card.strDrink }</h4>
            </div>
          )
         } else {
          return (
            <div key={ index } data-testid={ `${index}-recomendation-card` }>
              <img src={ card.strMealThumb } width="100px" />
              <h5>{ card.strCategory }</h5>
              <h4>{ card.strMeal }</h4>
            </div>
          )
         }
        })
      }
      </Slider>
    </div>
  );
}

export default Recommendations;
