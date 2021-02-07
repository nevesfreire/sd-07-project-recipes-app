import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Button, CardDeck } from 'react-bootstrap';

import { getItem } from '../../services/localStorage';

import Header from '../../components/Header';
import DoneCards from './DoneCards';

const renderFilters = (callback) => (
  <div className="categories">
    <Button
      type="button"
      data-testid="filter-by-all-btn"
      onClick={ () => callback('all') }
    >
      All
    </Button>
    <Button
      type="button"
      data-testid="filter-by-food-btn"
      onClick={ () => callback('comida') }
    >
      Food
    </Button>
    <Button
      type="button"
      data-testid="filter-by-drink-btn"
      onClick={ () => callback('bebida') }
    >
      Drinks
    </Button>
  </div>
);

function DoneRecipes({ history, search = false }) {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    setDoneRecipes(getItem('doneRecipes') || []);
  }, []);

  const handleFilter = (filter) => {
    if (filter !== 'all') {
      const recipes = getItem('doneRecipes');
      if (recipes) setDoneRecipes(recipes.filter(({ type }) => type === filter));
    } else {
      setDoneRecipes(getItem('doneRecipes') || []);
    }
  };

  return (
    <>
      <Header history={ history } search={ search } />
      {renderFilters(handleFilter)}
      <CardDeck
        style={ {
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          padding: '15px 30px',
        } }
      >
        {doneRecipes.map((recipe, index) => (
          <DoneCards key={ index + 1 } data={ recipe } index={ index } />
        ))}
      </CardDeck>
    </>
  );
}

DoneRecipes.defaultProps = { search: false };

DoneRecipes.propTypes = {
  search: PropTypes.bool,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DoneRecipes;
