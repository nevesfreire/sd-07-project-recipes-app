import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchForm from './SearchForm';
import searchIcon from '../../images/searchIcon.svg';

const SearchBar = ({ title }) => {
  const [searching, setSearching] = useState(false);
  return (
    <div>
      {!searching ? (
        <a
          href
          data-testid="test-search-top-btn"
          type="button"
          onClick={ () => setSearching(!searching) }
          className="button-standard"
        >
          <img src={ searchIcon } alt="Profile" data-testid="search-top-btn" />
        </a>
      ) : (
        <SearchForm title={ title } />
      )}
    </div>
  );
};

SearchBar.propTypes = { title: PropTypes.string.isRequired };

export default SearchBar;
