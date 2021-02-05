import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useFetchApi } from '../hooks';
import { LoadingCard, Button, NotFound } from './Contructors';
import { SUBMIT_CATEGORY, CLEAR_ALL_FILTERS } from '../reducers';
import { CupNodesContext } from '../contexts';

const getLink = (drink) => {
  const foodURL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const drinkURL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  return drink ? drinkURL : foodURL;
};

export default function CategoryButtons({ number, drink }) {
  const { dispatchFilter } = useContext(CupNodesContext);
  const URL = getLink(drink);
  const [loading, result] = useFetchApi(URL);
  const resultArr = drink ? result.drinks : result.meals;
  if (loading && !!resultArr) return (<NotFound />);
  const submitCategory = ({ target: { id } }) => {
    dispatchFilter({ type: CLEAR_ALL_FILTERS });
    dispatchFilter({ type: SUBMIT_CATEGORY, payload: id });
  };
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
              { resultArr && resultArr.filter((_, index) => index < number)
                .map(({ strCategory }, i) => (
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
CategoryButtons.defaultProps = {
  number: 5,
  drink: true,
};

CategoryButtons.propTypes = {
  number: PropTypes.number,
  drink: PropTypes.bool,
};
