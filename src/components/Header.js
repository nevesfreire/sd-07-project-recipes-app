import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const state = useSelector(({ header }) => header);
  const { hasSearchIcon, pageTitle } = state;
  const history = useHistory();

  const changePage = () => {
    history.push('/perfil');
  };

  const renderIcon = () => {
    if (hasSearchIcon) {
      return (
        <button
          type="button"
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search icon"
          />
        </button>
      );
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={ changePage }
      >
        <img
          data-testid="profile-top-btn"
          src={ ProfileIcon }
          alt="profile icon"
        />
      </button>
      <h1 data-testid="page-title">{pageTitle}</h1>
      {renderIcon()}
    </div>
  );
}

export default Header;
