import React, { useCallback, useEffect, useContext } from 'react';
// import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useFetchApi } from '../../hooks';
import { LoadingCard, NotFound } from '../Contructors';
import { factoryCard } from '../../Services';
import { CLEAR_ALL_FILTERS } from '../../reducers';
import { CupNodesContext } from '../../contexts';

const magicOne = 1;

export default function CardsFactory(
  { URL, number, testidImg, testidCard, testidTitle, drink },
) {
  const { dispatchFilter } = useContext(CupNodesContext);
  const clearFilters = useCallback(() => {
    dispatchFilter({ type: CLEAR_ALL_FILTERS });
  }, [dispatchFilter]);

  const [loading, result] = useFetchApi(URL);
  const resultArr = drink ? result.drinks : result.meals;
  const parameters = testidCard ? { testidImg, testidCard, testidTitle } : '';

  useEffect(() => {
    if (!loading && !resultArr) {
      clearFilters();
      window.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [clearFilters, loading, resultArr]);

  if (resultArr && resultArr.length === magicOne) {
    const [obj] = resultArr || [''];
    const key = drink ? 'idDrink' : 'idMeal';
    const route = drink ? `/bebidas/${obj[key]}` : `/comidas/${obj[key]}`;
    return <Redirect to={ route } />;
  }

  if (!loading && !resultArr) return (<NotFound />);

  return (
    <div className="cards">
      {
        loading
          ? (<LoadingCard />)
          : (factoryCard(resultArr, number, drink, parameters))
      }
    </div>
  );
}

CardsFactory.defaultProps = {
  number: 12,
  drink: true,
  testidImg: '',
  testidCard: '',
  testidTitle: '',
};

CardsFactory.propTypes = {
  number: PropTypes.number,
  drink: PropTypes.bool,
  URL: PropTypes.string.isRequired,
  testidImg: PropTypes.string,
  testidCard: PropTypes.string,
  testidTitle: PropTypes.string,
};
