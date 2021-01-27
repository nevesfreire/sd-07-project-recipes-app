import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import profile from '../../images/profileIcon.svg';
import searchbar from '../../images/searchIcon.svg';

function Header(props) {
  const { title } = props;
  const [search, setSearch] = useState(false);

  function input() {
    if (!search) {
      setSearch(true);
    } else {
      setSearch(false);
    }
  }

  return (
    <div>

      <button
        type="button"
        onClick={ () => <Redirect to="/perfil" /> }
      >
        <img data-testid="profile-top-btn" src={ profile } alt="profile-icon" />
      </button>

      <h1 data-testid="page-title">{title}</h1>
      <button
        type="button"
        onClick={ () => input() }
      >
        <img data-testid="search-top-btn" src={ searchbar } alt="search-icon" />
      </button>
      <div>
        { search && <input
          type="text"
          data-testid="search-input"
          placeholder="Buscar Receita"
        />}
      </div>
    </div>

  );
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
