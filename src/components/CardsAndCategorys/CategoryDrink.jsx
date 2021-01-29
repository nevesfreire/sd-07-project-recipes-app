import React, { useContext } from 'react';
import { useFetchApi } from '../../hooks';
import { SUBMIT_CATEGORY, CLEAR_CATEGORY } from '../../reducers';
import { CupNodesContext } from '../../contexts';

export default function CategoryDrink() {
  const { dispatchFilter, filterDates } = useContext(CupNodesContext);
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const [loading, { drinks }] = useFetchApi(URL);
  const five = 5;
  const submitCategory = ({ target: { id } }) => (
    filterDates.category.length
      ? dispatchFilter({ type: CLEAR_CATEGORY })
      : dispatchFilter({ type: SUBMIT_CATEGORY, payload: id })
  );
  return (
    <div>
      {
        loading
          ? (<h3>loading...</h3>)
          : drinks.filter((_, index) => index < five).map(({ strCategory }, i) => (
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
