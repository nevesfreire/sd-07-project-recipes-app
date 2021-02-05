import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import allActions from '../actions';
import FlexContainer from './FlexContainer';

function Header() {
  const state = useSelector(({ header }) => header);
  const { hasSearchIcon, pageTitle, barIsShowing } = state;
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSearchBar = () => {
    if (barIsShowing) {
      dispatch(allActions.hideBar());
    } else {
      dispatch(allActions.showBar());
    }
  };

  const changePage = () => {
    history.push('/perfil');
  };

  const renderIcon = () => {
    if (hasSearchIcon) {
      return (
        <button
          onClick={ handleSearchBar }
          type="button"
          className="header_btn_search"
        >
          <img
            className="header_btn_search--image"
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search icon"
          />
        </button>
      );
    }
  };

  return (
    <div className="header">
      <button
        type="button"
        onClick={ changePage }
        className="header_btn"
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profile icon"
          className="header_btn--image"
        />
      </button>
      <h1
        className="header_title"
        data-testid="page-title"
      >
        {pageTitle}
      </h1>
      {renderIcon()}
      <SearchBar />
    </div>
  );
}

export default Header;
