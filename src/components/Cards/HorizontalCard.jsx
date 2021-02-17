import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useFetchApi } from '../../hooks';
import { ShareButton, LoadingCard } from '..';
import { getURL } from '../../Services';

export default function HorizontalCard({ id, index, drink }) {
  const URL = getURL({ id }, drink);
  const [loading, result] = useFetchApi(URL);

  const resultObj = useMemo(() => {
    const type = drink ? 'drinks' : 'meals';
    const [typeObj] = result[type] || [''];
    return typeObj;
  }, [result, drink]);

  const [route, keyType, two] = useMemo(() => {
    const newRoute = `/${drink ? 'bebidas' : 'comidas'}/${id}`;
    const type = drink ? 'Drink' : 'Meal';
    const magicTwo = 2;
    return [newRoute, type, magicTwo];
  }, [drink, id]);

  return (
    loading
      ? (<LoadingCard />)
      : (
        <div>
          <Link to={ route }>
            <img
              alt="Card img"
              data-testid={ `${index}-horizontal-image` }
              src={ resultObj[`str${keyType}Thumb`] }
            />
          </Link>
          <div>
            <h5 data-testid={ `${index}-horizontal-top-text` }>
              {
                drink
                  ? resultObj.strAlcoholic
                  : `${resultObj.strCategory} - ${resultObj.strArea}`
              }
            </h5>
            <ShareButton data-testid={ `${index}-horizontal-share-btn` } URL={ route } />
          </div>
          <Link to={ route }>
            <h3 data-testid={ `${index}-horizontal-name` }>
              {resultObj[`str${keyType}`]}
            </h3>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>data</p>
          <div>
            {
              !drink
                && resultObj.strTags.split(',')
                  .filter((_, i) => i >= two).map((tag, i) => (
                    <span
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                      key={ i }
                    >
                      {tag}
                    </span>
                  ))
            }
          </div>
        </div>
      )
  );
}

HorizontalCard.defaultProps = {
  drink: true,
};

HorizontalCard.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  drink: PropTypes.bool,
};
