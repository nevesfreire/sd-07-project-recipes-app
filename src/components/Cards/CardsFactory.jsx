import React, { useCallback, useEffect, useContext } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useFetchApi } from '../../hooks';
import { LoadingCard } from '../Contructors';
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
  // const { push } = useHistory();
  const [loading, result] = useFetchApi(URL);
  const resultArr = drink ? result.drinks : result.meals;
  const parameters = testidCard ? { testidImg, testidCard, testidTitle } : '';
  useEffect(dispatchFil, [dispatchFil]);
  if (!loading && !resultArr) {
    return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
  // if (!loading && resultArr.length === 1) console.log(resultArr);
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
