import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ItemsCarousel from 'react-items-carousel';
import { useFetchApi } from '../hooks';
import { LoadingCard, NotFound } from './Contructors';
import './components.css';

export default function DrinkRecomendation() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const [loading, { drinks }] = useFetchApi(URL);
  const ZERO = 0;
  const [activeItemIndex, setActiveItemIndex] = useState(ZERO);
  const chevronWidth = 40;
  if (!loading && !drinks) return (<NotFound />);
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
              {drinks && drinks.filter((_, index) => index < SIX)
                .map(({ idDrink, strAlcoholic, strDrink, strDrinkThumb }, i) => (
                  <Link
                    to={ `/bebidas/${idDrink}` }
                    key={ i }
                    data-testid={ `${i}-recomendation-card` }
                  >
                    <img src={ strDrinkThumb } alt="ico" className="recomendation-card" />
                    <h5 data-testid={ `${i}-recomendation-title` }>{strDrink}</h5>
                    <p>{strAlcoholic}</p>
                  </Link>
                ))}
            </ItemsCarousel>
          )
      }
    </div>
  );
}
