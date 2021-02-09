import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';

function HeaderNoSearch({ title }) {
  return (
    <header id="headerProfile">
      <Link to="/perfil">
        <img
          className="title"
          src={ profileIcon }
          alt="Imagem do profile"
          data-testid="profile-top-btn"
        />
      </Link>
      <div
        className="title"
        data-testid="page-title"
      >
        <h2>
          { title }
        </h2>
      </div>
    </header>
  );
}

HeaderNoSearch.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderNoSearch;
