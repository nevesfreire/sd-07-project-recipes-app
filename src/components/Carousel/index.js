import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../Card';
import RequestData from '../../services/RequestAPI';
import './style.css';

function Carousel() {
  const { category } = useParams();
  const [recomendation, setRecomendation] = useState([]);
  // console.log(recomendation);

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

  const images = (item1, item2, index) => {
    const active = !(index - 1) ? 'active' : '';
    return (
      <div key={ index } className={ `carousel-item ${active}` }>
        <div className="col-xs-4 disp">
          <Card
            key={ index - 1 }
            index={ index - 1 }
            id={ (category !== 'comidas') ? item1.idMeal : item1.idDrink }
            name={ (category !== 'comidas') ? item1.strMeal : item1.strDrink }
            thumb={ (category !== 'comidas') ? item1.strMealThumb : item1.strDrinkThumb }
            recipeType={ (category !== 'comidas') ? 'comidas' : 'bebidas' }
            testIdCard={ `${index - 1}-recomendation-card` }
            testIdThumb=""
            testIdTitle={ `${index - 1}-recomendation-title` }
          />
          <Card
            key={ index }
            index={ index }
            id={ (category !== 'comidas') ? item2.idMeal : item2.idDrink }
            name={ (category !== 'comidas') ? item2.strMeal : item2.strDrink }
            thumb={ (category !== 'comidas') ? item2.strMealThumb : item2.strDrinkThumb }
            recipeType={ (category !== 'comidas') ? 'comidas' : 'bebidas' }
            testIdCard={ `${index}-recomendation-card` }
            testIdThumb=""
            testIdTitle={ `${index}-recomendation-title` }
          />
        </div>
      </div>
    );
  };

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
                return images(array[index - 1], item, index);
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
