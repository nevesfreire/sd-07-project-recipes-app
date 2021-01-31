import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { profileIcon, searchIcon } from '../images';
import SearchBar from './SearchBar';
import Button from './Button';

export default function Header({ title, profile, search }) {
  const { push } = useHistory();
  const [searchBar, setSearchBar] = useState(false);
  return (
    <div>
      <nav className="header navbar navbar-expand-lg navbar-light bg-light">
        {profile && (
          <Button
            testid="profile-top-btn"
            icon={ profileIcon }
            func={ () => { push('/perfil'); } }
          />
        )}
        <h1 data-testid="page-title">{title}</h1>
        {search && (
          <Button
            testid="search-top-btn"
            icon={ searchIcon }
            func={ () => { setSearchBar(!searchBar); } }
          />
        )}
      </nav>
      {searchBar && <SearchBar title={ title } /> }
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
