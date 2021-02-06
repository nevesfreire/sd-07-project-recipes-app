import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../Card';
import RequestData from '../../services/RequestAPI';
import './style.css';

const images = (item1, item2, index, category) => {
  const array = [item1, item2];
  const active = !(index - 1) ? 'active' : '';
  return (
    <div key={ index } className={ `carousel-item ${active}` }>
      <div className="col-xs-4 disp">
        {
          array.map((item, i) => (
            <Card
              key={ index - 1 + i }
              index={ index - 1 + i }
              id={ (category !== 'comidas') ? item.idMeal : item.idDrink }
              name={ (category !== 'comidas') ? item.strMeal : item.strDrink }
              thumb={ (category !== 'comidas')
                ? item.strMealThumb
                : item.strDrinkThumb }
              recipeType={ (category !== 'comidas') ? 'comidas' : 'bebidas' }
              testIdCard={ `${index - 1 + i}-recomendation-card` }
              testIdThumb=""
              testIdTitle={ `${index - 1 + i}-recomendation-title` }
            />
          ))

        }
      </div>
    </div>
  );
};

function Carousel() {
  const { category } = useParams();
  const [recomendation, setRecomendation] = useState([]);

  useEffect(() => {
    if (category === 'comidas') {
      RequestData(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      ).then((response) => {
        setRecomendation(response.drinks);
      });
    } else { // if (category === 'bebidas') {
      RequestData(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      ).then((response) => {
        setRecomendation(response.meals);
      });
    }
  }, [category]);

  const zero = 0;
  const cardsPerPage = 6;
  if (!recomendation) return (<span>Carregando...</span>);
  return (
    <div className="container">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
          />
          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" />
          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" />
        </ol>
        <div className="carousel-inner">
          {
            recomendation.slice(zero, cardsPerPage).map((item, index, array) => {
              const even = 2;
              if (index % even !== zero) {
                return images(array[index - 1], item, index, category);
              }
              return false;
            })
          }
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="prev"
        >

          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </a>
      </div>
    </div>
  );
}

export default Carousel;
