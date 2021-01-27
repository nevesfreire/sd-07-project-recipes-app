import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../App.css';

function Header({ title }) {
  return (
    <header>
      <Link to="/perfil">
        <img
          className="title"
          src={ profileIcon }
          alt="Imagem do profile"
          data-testid="profile-top-btn"
        />
      </Link>
      <title
        className="title"
        data-testid="page-title"
      >
        <h2>
          { title }
        </h2>
      </title>
      <img
        src={ searchIcon }
        alt="Imagem do profile"
        data-testid="search-top-btn"
      />
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
