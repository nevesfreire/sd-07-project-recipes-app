import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import context from '../../context';
import './style.css';

function Filters({ filters }) {
  const { activeFilter, setActiveFilter } = useContext(context);

  const handleClick = (filterName) => {
    if (filterName === activeFilter) {
      setActiveFilter('');
    } else {
      setActiveFilter(filterName);
    }
  };

  return (
    <div className="filters-container">
      <label
        className="filters-content"
        htmlFor="filters-buttons-All"
      >
        <span>All</span>
        <input
          className="filters-checkbox"
          data-testid="All-category-filter"
          id="filters-buttons-All"
          type="checkbox"
          name="filters-buttons"
          onChange={ () => handleClick('') }
          checked={ (activeFilter === '') }
        />
      </label>
      {
        filters.map((item, index) => {
          const maxButtons = 4;
          if (index > maxButtons) return false;

          return (
            <label
              key={ index }
              className="filters-content"
              htmlFor={ `filters-buttons-${index}` }
            >
              <span>{item.strCategory}</span>
              <input
                className="filters-checkbox"
                data-testid={ `${item.strCategory}-category-filter` }
                id={ `filters-buttons-${index}` }
                type="checkbox"
                name="filters-buttons"
                onChange={ () => handleClick(item.strCategory) }
                checked={ (item.strCategory === activeFilter) }
              />
            </label>
          );
        })
      }
    </div>
  );
}

Filters.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Filters;
