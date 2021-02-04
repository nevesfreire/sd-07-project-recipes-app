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

const pageTitle = (title) => (<h1 data-testid="page-title">{title}</h1>);

const searchRecipeComponent = (pathname, toggleSearch, title) => (
  toggleSearch ? (
    <SearchRecipes
      title={ title }
      pathname={ pathname }
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
    return history.push('/comidas');
  };

  const render = () => (
    <div className="header">
      {pageTitle(title)}
      {searchBtn(searchButton, toggleSearch, callSearch)}
      {profileTopBtn(profileButton, history)}
      {searchRecipeComponent(pathname, toggleSearch, title)}
    </div>
  );

  return render();
}
