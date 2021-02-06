import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShareButton from '../ShareButton';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { setStorage, getStorage } from '../../services/localStorage';
import './style.css';

function FavoriteAndDone({ data }) {
  const [filter, setFilter] = useState(undefined);

  useEffect(() => setFilter(data), [data]);

  function handleFilter(filterType) {
    if (filterType === 'Food') {
      setFilter(data.filter((item) => item.type === 'comida'));
    } else if (filterType === 'Drinks') {
      setFilter(data.filter((item) => item.type === 'bebida'));
    } else {
      setFilter(data);
    }
  }
  function handleClick(id) {
    const localFavorite = getStorage('favoriteRecipes');
    const newFavorite = localFavorite.filter((item) => item.id !== id);
    setStorage('favoriteRecipes', newFavorite);
    window.location.reload();
  }
  return (
    <div>
      {!filter ? (
        'Loading...'
      ) : (
        <div>
          <div>
            <button
              type="button"
              onClick={ () => handleFilter('All') }
              data-testid="filter-by-all-btn"
            >
              All
            </button>

            <button
              type="button"
              onClick={ () => handleFilter('Food') }
              data-testid="filter-by-food-btn"
            >
              Food
            </button>

            <button
              type="button"
              onClick={ () => handleFilter('Drinks') }
              data-testid="filter-by-drink-btn"
            >
              Drinks
            </button>
          </div>
          <div>
            {filter.map((item, index) => (
              <div key={ index }>
                <Link to={ `/${item.type}s/${item.id}` }>
                  <img
                    className="favorite-and-done-image"
                    data-testid={ `${index}-horizontal-image` }
                    src={ item.image }
                    alt={ item.name }
                  />
                </Link>

                <h4 data-testid={ `${index}-horizontal-top-text` }>
                  {item.area === ''
                    ? item.alcoholicOrNot
                    : `${item.area} - ${item.category}`}
                </h4>

                <Link to={ `/${item.type}s/${item.id}` }>
                  <h2 data-testid={ `${index}-horizontal-name` }>{item.name}</h2>
                </Link>

                <span data-testid={ `${index}-horizontal-done-date` }>
                  {item.doneDate}
                </span>

                <ShareButton
                  testId={ `${index}-horizontal-` }
                  id={ item.id }
                  type={ item.type }
                />

                {window.location.pathname === '/receitas-favoritas' && (
                  <button type="button" onClick={ () => handleClick(item.id) }>
                    <img
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      src={ blackHeartIcon }
                      alt="descompartilhar"
                    />
                  </button>
                )}

                {window.location.pathname === '/receitas-feitas'
                  && item.tags.map((tag) => (
                    <span
                      key={ tag }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

FavoriteAndDone.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FavoriteAndDone;
