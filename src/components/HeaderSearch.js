import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function HeaderSearch({ toggle }) {
  return (
    <div
      style={ `display: ${toggle ? 'inline' : 'none'}` }
    >
      <label htmlFor="busca">
        <input
          id="busca"
          data-testid="search-input"
        />
      </label>
      <div>
        <input
          type="radio"
          data-testid="ingredient-search-radio"
        />
        <input
          type="radio"
          data-testid="name-search-radio"
        />
        <input
          type="radio"
          data-testid="first-letter-search-radio"
        />
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
}

HeaderSearch.propTypes = {
  toggle: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ searchToggleReducer }) => ({
  toggle: searchToggleReducer,
});

export default connect(mapStateToProps)(HeaderSearch);
