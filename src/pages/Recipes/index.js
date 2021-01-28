import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Context } from '../../context/Provider';

import Card from '../../components/Card';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Recipes({ history, search = false }) {
  const [slicedResults, setSlicedResults] = useState([]);
  const { setApi, results, isFetching, setIsFetching } = useContext(Context);
  const { pathname } = history.location;

  useEffect(() => {
    if (pathname.includes('bebidas')) setApi('drinks');
    else setApi('meal');
  }, [pathname, setApi]);

  useEffect(() => {
    if (!isFetching) return;
    const initial = 0;
    const end = 12;
    if (results.length > initial) {
      setSlicedResults(results.slice(initial, end));
      setIsFetching(false);
    } else {
      // eslint-disable-next-line no-alert
      window.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [isFetching, results, setIsFetching]);

  return (
    <>
      <Header history={ history } search={ search } />
      {slicedResults.map((res, index) => {
        const card = {
          id: res.idMeal || res.idDrink,
          name: res.strMeal || res.strDrink,
          img: res.strMealThumb || res.strDrinkThumb,
        };
        return (
          <Card key={ index + 1 } data={ card } index={ index } />
        );
      })}
      {
        pathname !== '/receitas-feitas'
        && (
          pathname !== '/receitas-favoritas' && <Footer />)
      }
    </>
  );
}

Recipes.defaultProps = { search: false };

Recipes.propTypes = {
  search: PropTypes.bool,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Recipes;
