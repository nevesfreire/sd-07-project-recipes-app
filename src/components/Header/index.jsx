import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
      <Link to="/perfil">
        <img src={ profile } data-testid="profile-top-btn" alt="profileIcon" />
      </Link>

      <h1 data-testid="page-title">{title}</h1>
      <button
        type="button"
        onClick={ () => input() }
      >
        <img
          data-testid="search-top-btn"
          src={ searchbar }
          alt="search-icon"
        />
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
