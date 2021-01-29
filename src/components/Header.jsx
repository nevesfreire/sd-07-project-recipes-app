import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { profileIcon, searchIcon } from '../images';
import SearchBar2 from './SearchBar';

// Se for passado profile = false como props, não será renderizado.
// Se for passado search = false como props, não será renderizado.
// O titulo da header é passado via props com a chave title.
export default function Header({ title, profile, search }) {
  const [searchBar, setSearchBar] = useState(false);
  return (
    <div>
      {profile && (
        <Link
          to="/perfil"
          data-testid="profile-top-btn"
        >
          <img
            src={ profileIcon }
            alt="icone de perfil"
          />
        </Link>
      )}
      <h1 data-testid="page-title">{title}</h1>
      {search && (
        <button
          type="button"
          data-testid="search-top-btn"
          onClick={ () => { setSearchBar(!searchBar); } }
        >
          <img src={ searchIcon } alt="icone de perfil" />
        </button>)}
      {searchBar && <SearchBar2 title={ title } /> }
    </div>
  );
}

Header.defaultProps = {
  profile: true,
  search: true,
};

Header.propTypes = {
  profile: PropTypes.bool,
  search: PropTypes.bool,
  title: PropTypes.string.isRequired,
};
