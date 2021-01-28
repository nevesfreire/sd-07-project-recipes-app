import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import searchIcon from '../images/searchIcon.svg';

function SearchButton() {
  const {
    handleSearchButton,
  } = useContext(RecipesContext);

  return (

    <button
      type="button"
      onClick={ (e) => handleSearchButton(e) }
    >
      <img
        src={ searchIcon }
        alt="search-icon"
        data-testid="search-top-btn"
      />
    </button>

  );
}

export default SearchButton;
