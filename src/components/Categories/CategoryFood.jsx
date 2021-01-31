import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useFetchApi } from '../../hooks';
import { LoadingCard } from '../Cards';
import { SUBMIT_CATEGORY, CLEAR_CATEGORY } from '../../reducers';
import { CupNodesContext } from '../../contexts';
import Button from '../Button';

export default function CategoryFood({ number }) {
  const { dispatchFilter, filterDates } = useContext(CupNodesContext);
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const [loading, { meals }] = useFetchApi(URL);
  const submitCategory = ({ target: { id } }) => (
    filterDates.category.length
      ? dispatchFilter({ type: CLEAR_CATEGORY })
      : dispatchFilter({ type: SUBMIT_CATEGORY, payload: id })
  );
  return (
    <div className="categorys">
      {
        loading
          ? (<LoadingCard />)
          : (
            <div className="btn-group" role="group" aria-label="Basic example">
              <Button
                classBootstrap="btn btn-secondary"
                text="All"
                func={ submitCategory }
              />
              {meals.filter((_, index) => index < number).map(({ strCategory }, i) => (
                <Button
                  id={ strCategory }
                  key={ `btc-fil-${i}` }
                  testid={ `${strCategory}-category-filter` }
                  classBootstrap="btn btn-secondary"
                  text={ strCategory }
                  func={ submitCategory }
                />
              ))}
            </div>
          )
      }
    </div>
  );
}
CategoryFood.defaultProps = {
  number: 5,
};

CategoryFood.propTypes = {
  number: PropTypes.number,
};
