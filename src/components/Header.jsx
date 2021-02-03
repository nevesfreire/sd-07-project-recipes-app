import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchRecipes from './SearchRecipes';

const profileTopBtn = (profileButton, history) => {
  if (profileButton) {
    return (
      <button
        type="button"
        onClick={ () => history.push('/perfil') }
      >
        <img
          src={ profileIcon }
          alt="profile-icon"
          data-testid="profile-top-btn"
        />
      </button>
    );
  }
};

const pageTitle = (title) => (

  <h1 data-testid="page-title">{title}</h1>

);

const searchBtn = (searchButton, toggleSearch, setToggleSearch) => {
  if (searchButton) {
    return (
      <button
        type="button"
        data-testid="header_search_bar"
        onClick={ () => setToggleSearch(!toggleSearch) }
      >
        <img
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="search-icon"
        />
      </button>
    );
  }
};

const searchRecipeComponent = (pathname, toggleSearch, title) => (
  toggleSearch ? (
    <SearchRecipes
      title={ title }
      pathname={ pathname }
    />) : null
);

// ? Header ({componentConfig})
export default function Header({ pathname, componentConfig }) {
  const [toggleSearch, setToggleSearch] = useState(false);
  const { title, profileButton, searchButton } = componentConfig;
  const history = useHistory();

  const render = () => (
    <div className="header">
      <div className="header-buttons">
        {profileTopBtn(profileButton, history)}
        {pageTitle(title)}
        {searchBtn(searchButton, toggleSearch, setToggleSearch)}
        {searchRecipeComponent(pathname)}
      </div>
    </div>
  );

  return render();
}
