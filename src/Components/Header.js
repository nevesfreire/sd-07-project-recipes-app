import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import search from '../images/searchIcon.svg';
import profile from '../images/profileIcon.svg';

const Header = (props) => {
  const { title, showSearch } = props;
  return (
    <header>
      <h1 data-testid="page-title">{title}</h1>
      <Link to="/perfil">
        <img src={ profile } data-testid="profile-top-btn" alt="profileIcon" />
      </Link>
      {showSearch && (
        <img src={ search } data-testid="search-top-btn" alt="searchIcon" />
      )}
    </header>
  );
};

Header.defaultProps = {
  showSearch: false,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showSearch: PropTypes.bool,
};

export default Header;
