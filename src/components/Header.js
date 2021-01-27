import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ProfileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const hasSearchIcon = useSelector(state => state.hasSearchIcon);
  console.log(hasSearchIcon);

  const changePage = () => {
  
  }

  const renderIcon = () => {
    if (hasSearchIcon) {
      return (
        <button type="button"
          onClick={changePage}>
          <img
          data-testid="search-top-btn"
          src={searchIcon} alt="search icon"
          />
        </button>
      );
    }
  }

  return(
    <div>
    <button type="button">
      <img
        data-testid="profile-top-btn"
        src={ProfileIcon} alt="profile icon"
      />
    </button>
    <h1 data-testid="page-title">Título</h1>
    {renderIcon()}
  </div>
  )
}

export default Header;