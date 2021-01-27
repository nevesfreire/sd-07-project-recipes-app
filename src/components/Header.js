import React, { useState } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, hideSearchIcon }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  return (
    <header className="header">
      <a data-testid="profile-top-btn" href="/perfil" src={ profileIcon }>
        <img src={ profileIcon } alt="profile icon" />
      </a>
      <h1 data-testid="page-title">{title}</h1>
      {!JSON.parse(hideSearchIcon) && (
        <button
          className="header-button"
          data-testid="search-top-btn"
          type="button"
          src={ searchIcon }
          onClick={ () => setShowSearchBar(!showSearchBar) }
        >
          <img src={ searchIcon } alt="search icon" />
        </button>
      )}
      {showSearchBar && (
        <div>
          <input
            type="text"
            data-testid="search-input"
            id="search"
            name="search"
            placeholder="Digite Aqui"
          />
          <br />
          <label htmlFor="ingredient">
            Ingredient
            <input
              type="radio"
              data-testid="ingredient-search-radio"
              id="ingredient"
              name="search-option"
            />
          </label>
          <label htmlFor="name">
            Name
            <input
              type="radio"
              data-testid="name-search-radio"
              id="name"
              name="search-option"
            />
          </label>
          <label htmlFor="first-letter">
            First Letter
            <input
              type="radio"
              data-testid="first-letter-search-radio"
              id="first-letter"
              name="search-option"
            />
          </label>
          <button data-testid="exec-search-btn" type="button">
            Buscar
          </button>
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  hideSearchIcon: PropTypes.string.isRequired,
};

export default Header;
