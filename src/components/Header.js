import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchRecipes from './SearchRecipes';

// eslint-disable-next-line max-lines-per-function
export default function Header({ pathname, componentConfig }) {
  const [toggleSearch, setToggleSearch] = useState(false);
  const { title, profileButton, searchButton } = props;

  const renderProfileTopBtn = () => {
    if (profileButton) {
      return (
        <Link to="/perfil" replace>
          <button type="button">
            <img
              src={ profileIcon }
              alt="profile-icon"
              data-testid="profile-top-btn"
            />
          </button>
        </Link>
      );
    }
  };

  const renderPageTitle = () => (

    <h1 data-testid="page-title">{title}</h1>

  );

  const renderSearchBtn = () => {
    if (searchButton) {
      return (
        <button
          type="button"
          data-testid="header_search_bar"
          onClick={ () => setToggleSearch(!toggleSearch) }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search-icon"
          />
        </button>
      );
    }
  };

  const renderSearchRecipeComponent = () => (
    toggleSearch ? (
      <SearchRecipes
        title={ title }
        pathname={ pathname }
      />) : null
  );

  const render = () => (
    <div className="header_content">
      {renderProfileTopBtn()}
      {renderPageTitle()}
      {renderSearchBtn()}
      {renderSearchRecipeComponent()}
    </div>
  );
  return render();
}

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
  componentConfig: PropTypes.shape({
    profileButton: PropTypes.bool.isRequired,
    searchButton: PropTypes.bool.isRequired,
  }).isRequired,
};
