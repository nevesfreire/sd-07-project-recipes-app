import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
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
    <div style={ { backgroundColor: '#c4c4c4' } }>
      <header
        style={ {
          backgroundColor: '#c4c4c4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between' } }
      >
        {showSearcIcon && (
          <Button
            variant="text"
            onClick={ () => toggleShowSearch() }
          >
            <img
              src={ search }
              data-testid="search-top-btn"
              alt="searchIcon"
            />
          </Button>
        )}
        <h2 data-testid="page-title">{title}</h2>
        <Link to="/perfil">
          <img
            src={ profile }
            data-testid="profile-top-btn"
            alt="profileIcon"
            style={ { height: '32px', width: '100px' } }
          />
        </Link>
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
