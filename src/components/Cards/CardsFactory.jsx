import React, { useCallback, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useFetchApi } from '../../hooks';
import { LoadingCard, NotFound } from '../Contructors';
import { factoryCard } from '../../Services';
import { CLEAR_ALL_FILTERS } from '../../reducers';
import { CupNodesContext } from '../../contexts';

export default function CardsFactory(
  { URL, number, testidImg, testidCard, testidTitle, drink },
) {
  const { dispatchFilter } = useContext(CupNodesContext);
  const dispatchFil = useCallback(() => {
    dispatchFilter({ type: CLEAR_ALL_FILTERS });
  }, [dispatchFilter]);
  const [loading, result] = useFetchApi(URL);
  const resultArr = drink ? result.drinks : result.meals;
  const parameters = testidCard ? { testidImg, testidCard, testidTitle } : '';
  useEffect(dispatchFil, [dispatchFil]);
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
