import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import search from '../images/searchIcon.svg';
import profile from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

const Header = (props) => {
  const { title, showSearcIcon } = props;
  const [showSearch, setShowSearch] = useState(false);

  function toggleShowSearch() {
    if (showSearch) setShowSearch(false);
    else setShowSearch(true);
  }

  return (
    <div>
      <header>
        <h1 data-testid="page-title">{title}</h1>
        <Link to="/perfil">
          <img src={ profile } data-testid="profile-top-btn" alt="profileIcon" />
        </Link>
        {showSearcIcon && (
          <button
            type="button"
            onClick={ () => toggleShowSearch() }
          >
            <img
              src={ search }
              data-testid="search-top-btn"
              alt="searchIcon"
            />
          </button>
        )}
      </header>
      {showSearch && (
        <SearchBar pageId={ title } />
      )}
    </div>
  );
};

Header.defaultProps = {
  showSearcIcon: false,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showSearcIcon: PropTypes.bool,
};

export default Header;
