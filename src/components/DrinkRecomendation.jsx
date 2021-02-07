import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useFetchApi } from '../hooks';
import { LoadingCard, NotFound } from './Contructors';
import './components.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function DrinkRecomendation() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const [loading, { drinks }] = useFetchApi(URL);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  if (!loading && !drinks) return (<NotFound />);
  const SIX = 6;
  return (
    <div className="carousel-div">
      {
        loading
          ? (<LoadingCard />)
          : (
            <Slider { ...settings }>
              {drinks && drinks.filter((_, index) => index < SIX)
                .map(({ idDrink, strAlcoholic, strDrink, strDrinkThumb }, i) => (
                  <Link
                    to={ `/bebidas/${idDrink}` }
                    key={ i }
                    className="slideCard"
                    data-testid={ `${i}-recomendation-card` }
                  >
                    <img src={ strDrinkThumb } alt="ico" className="recomendation-card" />
                    <h5 data-testid={ `${i}-recomendation-title` }>{strDrink}</h5>
                    <p>{strAlcoholic}</p>
                  </Link>
                ))}
            </Slider>
          )
      }
    </div>
  );
}
