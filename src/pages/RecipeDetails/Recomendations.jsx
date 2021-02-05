import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';
import { useHistory } from 'react-router-dom';

export default function Recomendations() {
  const [recomendationList, setRecomendationList] = useState([]);
  const history = useHistory();
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 2,
  //   slidesToScroll: 1,
  // };

  const fetchRecomendations = async () => {
    try {
      let endpoint = '';
      const { location: { pathname } } = history;
      const path = pathname.split('/')[1];
      console.log(path);
      if (path === 'comidas') {
        endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      } else {
        endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      }
      const results = await fetch(endpoint)
        .then((response) => response.json())
        .then((details) => (details.meals ? details.meals : details.drinks));
      setRecomendationList(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecomendations();
  }, []);

  const recomendations = () => (
    // <Slider { ...settings }>
    recomendationList.map((item, index) => (
      <div
        key={ index }
        className="container-title-image"
        data-testid={ `${index}-recomendation-card` }
      >
        <img
          className="recipe-photo"
          data-testid="recipe-photo"
          src={ item.strMealThumb || item.strDrinkThumb }
          alt="imagem do produto"
          width="200"
        />
        <h1 data-testid="recipe-title">
          { item.strMeal || item.strDrink }
        </h1>
        <h4
          className="recipe-category"
          data-testid="recipe-category"
        >
          { item.strAlcoholic || item.strCategory }
        </h4>
      </div>
    ))
    // </Slider>
  );

  return (
    recomendations()
  );
}
