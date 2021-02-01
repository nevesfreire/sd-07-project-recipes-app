/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { profileIcon } from '../../images/index';
import SearchBar from '../SearchBar';

function Header({ title }) {
  return (
    <header>
      <nav>
        <Link className="profile" to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Icone de perfil"
          />
        </Link>
        <h1
          data-testid="page-title"
          className="title"
        >
          { title }
        </h1>
        {
          (title === 'Comidas' || title === 'Explorar Origem' || title === 'Bebidas')
          && <SearchBar title={ title } />
        }
      </nav>
    </header>
  );
}

Header.propTypes = { title: PropTypes.string.isRequired };

export default Header;
