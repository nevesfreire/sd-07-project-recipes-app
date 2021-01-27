import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const history = useHistory();
  const titleGeneration = () => {
    const path = history.location.pathname;
    const titleArray = path.split('/');
    const zero = 0;
    const two = 2;
    const titleMap = titleArray.map((palavra) => (palavra.length > zero
      ? palavra.replace(palavra.charAt(zero), palavra.charAt(zero).toUpperCase())
      : ''));
    const title = titleMap.length > two
      ? `${titleMap[1]} ${titleMap[two]}`
      : `${titleMap[1]}`;
    return title;
  };

  return (
    <div>
      <img
        src={ profileIcon }
        alt="profile icon"
        data-testid="profile-top-btn"
      />

      <h1 data-testid="page-title">
        { titleGeneration() }
      </h1>

      <img
        src={ searchIcon }
        alt="profile icon"
        data-testid="search-top-btn"
        id="searchBtn"
      />
    </div>
  );
}

export default Header;
