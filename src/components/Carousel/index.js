import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

import { fetchApi } from '../../services/api';

function CarouselList({ history }) {
  const [results, setResults] = useState([]);
  const { pathname } = history.location;

  useEffect(() => {
    const fetchData = async () => {
      const api = pathname.includes('comidas') ? 'drink' : 'meal';
      const data = await fetchApi('', 'name', api);
      setResults(data.slice(0,6));
    };
    fetchData();
  }, []);
  
  return (
    <Carousel>
      {results.map((res, index) => (
        <Carousel.Item
          key={res.idMeal || res.idDrink}
          data-testid={`${index}-recomendation-card`}
          width="100px"
        >
          <img
            alt="thumbnail"
            width="100px"
            src={ res.strMealThumb || res.strDrinkThumb }
          />
          <Carousel.Caption>
            <p data-testid={`${index}-recomendation-title`}>{res.strMeal || res.strDrink}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselList;
