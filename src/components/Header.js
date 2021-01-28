import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchRecipes from './SearchRecipes';

const renderProfileTopBtn = (profileButton) => {
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

const renderPageTitle = (title) => (

  <h1 data-testid="page-title">{title}</h1>

);

const renderSearchBtn = (searchButton, toggleSearch, setToggleSearch) => {
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

const renderSearchRecipeComponent = (pathname) => (
  toggleSearch ? (
    <SearchRecipes
      title={ title }
      pathname={ pathname }
    />) : null
);

// ? Header ({componentConfig})
export default function Header(props, { pathname }) {
  const [toggleSearch, setToggleSearch] = useState(false);
  const { title, profileButton, searchButton } = props;

  const render = () => (
    <div className="header_content">
      {renderProfileTopBtn(profileButton)}
      {renderPageTitle(title)}
      {renderSearchBtn(searchButton, toggleSearch, setToggleSearch)}
      {renderSearchRecipeComponent(pathname)}
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
