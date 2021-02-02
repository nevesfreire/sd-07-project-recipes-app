import React, { useState } from 'react';
import SearchForm from './SearchForm';
import searchIcon from '../../images/searchIcon.svg';

const SearchBar = () => {
  const [searching, setSearching] = useState(false);
  return (
    <div>
      <a
        href
        data-testid="test-search-top-btn"
        type="button"
        onClick={ () => setSearching(!searching) }
      >
        <img src={ searchIcon } alt="Search" data-testid="search-top-btn" />
      </a>
      {searching && <SearchForm />}
    </div>
  );
};

export default SearchBar;
