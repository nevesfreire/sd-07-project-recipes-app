import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';

import { fetchApi } from '../../services/api';

function CarouselList({ history }) {
  const [results, setResults] = useState([]);
  const { pathname } = history.location;

  useEffect(() => {
    const fetchData = async () => {
      const api = pathname.includes('comidas') ? 'drink' : 'meal';
      const data = await fetchApi('', 'name', api);
      const initial = 0;
      const final = 6;
      setResults(data.slice(initial, final));
    };
    fetchData();
  }, [pathname]);

  return (
    <div style={ { padding: '15px 30px' } }>
      <p className="detail__field">Recomendados:</p>
      <Carousel style={ { marginBottom: 52 } }>
        {results.map((res, index) => (
          <Carousel.Item
            key={ res.idMeal || res.idDrink }
            data-testid={ `${index}-recomendation-card` }
            width="100px"
          >
            <img
              alt="thumbnail"
              style={ { width: '100%' } }
              src={ res.strMealThumb || res.strDrinkThumb }
            />
            <Carousel.Caption>
              <p
                data-testid={ `${index}-recomendation-title` }
              >
                {res.strMeal || res.strDrink}
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

CarouselList.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CarouselList;
