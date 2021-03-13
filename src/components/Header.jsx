import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import context from '../contextAPI/context';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchRecipes from './SearchRecipes';
import '../css/header.css';
import UseRedirect from '../hooks/useRedirect';
import siteMap from '../helpers/siteMap';

const profileTopBtn = (profileButton) => {
  const PATH = '/perfil';
  const [setPath] = UseRedirect();
  if (profileButton) {
    return (
      <Button
        type="button"
        variant="contained"
        onClick={ () => setPath(PATH) }
        className="header-button"
      >
        <img
          src={ profileIcon }
          alt="profile-icon"
          data-testid="profile-top-btn"
        />
      </Button>
    );
  }
  return (
    <div className="noShowBtn" />
  );
};

const pageTitle = (title) => {
  if (!title) return ('Aqui um Titulo');
  return (
    <h1
      data-testid="page-title"
      className="top-title"
    >
      {title}
    </h1>
  );
};

const searchRecipeComponent = (pathname, toggleSearch, title) => (
  toggleSearch ? (
    <SearchRecipes
      title={ title }
      pathname={ pathname }
      className="header-container"
    />) : null
);

const searchBtn = (searchButton, toggleSearch, onClick) => {
  if (!searchButton) return (<div className="noShowBtn" />);
  return (
    <Button
      type="button"
      data-testid="header_search_bar"
      variant="contained"
      // color="primary"
      onClick={ (e) => onClick(e) }
      className="header-button"
    >
      <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="search-icon"
      />
    </Button>
  );
};

const findMatch = (string, object) => (
  Object.keys(object).find((key) => key.match(string))
);

export default function Header() {
  const { state, setState } = useContext(context);

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const newHeader = siteMap[findMatch(pathname, siteMap)].header;
    setState((s) => ({ ...s, header: newHeader }));
  }, [pathname, setState]);

  const { header, toggleSearch } = state;
  const { searchButton, profileButton, title } = header;

  const callSearch = () => {
    setState((s) => ({
      ...s,
      toggleSearch: !toggleSearch,
    }));
  };

  return (
    <div className="header-container">
      <div className="header">
        {profileTopBtn(profileButton)}
        {pageTitle(title)}
        {searchBtn(searchButton, toggleSearch, callSearch)}
      </div>
      <div className="header-search">
        {searchRecipeComponent(pathname, toggleSearch, title)}
      </div>
    </div>
  );
}
