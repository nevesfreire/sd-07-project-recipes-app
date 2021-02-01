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
          className="btn btn-secondary"
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
    <FlexContainer className="header">
      <button
        type="button"
        onClick={ changePage }
        className="btn btn-secondary"
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profile icon"
        />
      </button>
      <h1 data-testid="page-title">{pageTitle}</h1>
      {renderIcon()}
      <SearchBar />
    </FlexContainer>
  );
}

export default Header;
