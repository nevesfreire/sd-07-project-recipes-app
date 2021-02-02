import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useFetchApi } from '../hooks';
import { LoadingCard } from './Contructors';
import { SUBMIT_AREA, CLEAR_AREA } from '../reducers';
import { CupNodesContext } from '../contexts';

export default function AreaFilterDropdown({ number }) {
  const { dispatchFilter } = useContext(CupNodesContext);
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const [loading, { meals }] = useFetchApi(URL);
  const submitCategory = ({ target: { value } }) => (
    value === 'All'
      ? dispatchFilter({ type: CLEAR_AREA })
      : dispatchFilter({ type: SUBMIT_AREA, payload: value })
  );
  return (
    <div>
      {
        loading
          ? (<LoadingCard />)
          : (
            <select
              data-testid="explore-by-area-dropdown"
              className="form-select"
              aria-label="Default select example"
              onChange={ submitCategory }
            >
              <option data-testid="All-option">All</option>
              { meals.filter((_, index) => index < (number || meals.length))
                .map(({ strArea }, i) => (
                  <option
                    key={ i }
                    data-testid={ `${strArea}-option` }
                  >
                    {strArea}
                  </option>
                ))}
            </select>
          )
      }
    </div>
  );
}

AreaFilterDropdown.defaultProps = {
  number: undefined,
};

AreaFilterDropdown.propTypes = {
  number: PropTypes.number,
};
