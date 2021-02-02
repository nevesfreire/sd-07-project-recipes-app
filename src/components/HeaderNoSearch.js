import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';

function Header({ title }) {
  return (
    <header>
      <Link to="/profile">
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
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
