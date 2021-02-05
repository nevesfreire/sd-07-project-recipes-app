import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import context from '../contextAPI/context';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchRecipes from './SearchRecipes';
import '../css/header.css';

const profileTopBtn = (profileButton, history) => {
  if (profileButton) {
    return (
      <Button
        type="button"
        variant="contained"
        // color="primary"
        onClick={ () => history.push('/perfil') }
        className="header"
      >
        <img
          src={ profileIcon }
          alt="profile-icon"
          data-testid="profile-top-btn"
        />
      </Button>
    );
  }
};

const pageTitle = (title) => (
  <h1
    data-testid="page-title"
    className="header"
  >
    {title}
  </h1>
);

const searchRecipeComponent = (pathname, toggleSearch, title) => (
  toggleSearch ? (
    <SearchRecipes
      title={ title }
      pathname={ pathname }
      className="header-container"
    />) : null
);

const searchBtn = (searchButton, toggleSearch, onClick) => {
  if (searchButton) {
    return (
      <Button
        type="button"
        data-testid="header_search_bar"
        variant="contained"
        // color="primary"
        onClick={ (e) => onClick(e) }
        className="header"
      >
        <img
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="search-icon"
        />
      </Button>
    );
  }
};

export default function Header() {
  const { state, setState } = useContext(context);

  const history = useHistory();
  const { location: { pathname } } = history;
  const { searchButton, profileButton, title, toggleSearch } = state;

  const callSearch = () => {
    setState((s) => ({
      ...s,
      toggleSearch: !toggleSearch,
    }));
  };

  const render = () => (
    <div className="main-reader-controller">
      <div className="header">
        {profileTopBtn(profileButton, history)}
        {pageTitle(title)}
        {searchBtn(searchButton, toggleSearch, callSearch)}
      </div>
      {searchRecipeComponent(pathname, toggleSearch, title)}
    </div>
  );

  return render();
}
