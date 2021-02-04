import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ItemsCarousel from 'react-items-carousel';
import { useFetchApi } from '../hooks';
import { LoadingCard, NotFound } from './Contructors';
import './components.css';

export default function FoodRecomendation() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const [loading, { meals }] = useFetchApi(URL);
  const ZERO = 0;
  const [activeItemIndex, setActiveItemIndex] = useState(ZERO);
  const chevronWidth = 40;
  if (!loading && !meals) return (<NotFound />);
  const SIX = 6;
  return (
    <div className="carousel-div">
      {
        loading
          ? (<LoadingCard />)
          : (
            <ItemsCarousel
              requestToChangeActive={ setActiveItemIndex }
              activeItemIndex={ activeItemIndex }
              numberOfCards={ 2 }
              gutter={ 20 }
              leftChevron={ <button type="button">{'<'}</button> }
              rightChevron={ <button type="button">{'>'}</button> }
              outsideChevron
              alwaysShowChevrons
              infiniteLoop
              chevronWidth={ chevronWidth }
            >
              {meals && meals.filter((_, index) => index < SIX)
                .map(({ idMeal, strArea, strMeal, strMealThumb }, i) => (
                  <Link
                    to={ `/bebidas/${idMeal}` }
                    key={ i }
                    data-testid={ `${i}-recomendation-card` }
                  >
                    <img src={ strMealThumb } alt="ico" className="recomendation-card" />
                    <h5 data-testid={ `${i}-recomendation-title` }>{strMeal}</h5>
                    <p>{strArea}</p>
                  </Link>
                ))}
            </ItemsCarousel>
          )
      }
    </div>
  );
}
