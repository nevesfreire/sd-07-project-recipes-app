import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useFetchApi } from '../hooks';
import { LoadingCard, NotFound } from './Contructors';
import { getURL } from '../Services';
import './components.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function FoodRecomendation() {
  const drink = false;
  const URL = getURL({}, drink);
  const [loading, { meals }] = useFetchApi(URL);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };
  if (!loading && !meals) return (<NotFound />);
  const SIX = 6;
  return (
    <div className="carousel-div">
      {
        loading
          ? (<LoadingCard />)
          : (
            <Slider { ...settings }>
              {meals && meals.filter((_, index) => index < SIX)
                .map(({ idMeal, strArea, strMeal, strMealThumb }, i) => (
                  <Link
                    to={ `/comidas/${idMeal}` }
                    key={ i }
                    data-testid={ `${i}-recomendation-card` }
                  >
                    <img src={ strMealThumb } alt="ico" className="recomendation-card" />
                    <h5 data-testid={ `${i}-recomendation-title` }>{strMeal}</h5>
                    <p>{strArea}</p>
                  </Link>
                ))}
            </Slider>
          )
      }
    </div>
  );
}
