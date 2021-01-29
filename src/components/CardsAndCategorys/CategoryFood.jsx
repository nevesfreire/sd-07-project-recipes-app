import React, { useContext } from 'react';
import { useFetchApi } from '../../hooks';
import { SUBMIT_CATEGORY } from '../../reducers';
import { CupNodesContext } from '../../contexts';

export default function CategoryFood() {
  const { dispatchFilter } = useContext(CupNodesContext);
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const [loading, { meals }] = useFetchApi(URL);
  const five = 5;
  const submitCategory = ({ target: { id } }) => {
    dispatchFilter({ type: SUBMIT_CATEGORY, payload: id });
  };
  return (
    <div>
      {
        loading
          ? (<h3>loading...</h3>)
          : meals.filter((_, index) => index < five).map(({ strCategory }, i) => (
            <button
              id={ strCategory }
              key={ `btc-fil-${i}` }
              type="button"
              onClick={ submitCategory }
              data-testid={ `${strCategory}-category-filter` }
            >
              {strCategory}
            </button>
          ))
      }
    </div>
  );
}
