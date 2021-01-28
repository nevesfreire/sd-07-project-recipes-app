import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../App.css';
import profileicon from '../../images/profileIcon.svg';
import searchicon from '../../images/searchIcon.svg';

const userName = 'User';
const Header = (props) => {
  const { title } = props;

  return (
    <div className="header">
      <div className="user">
        <Link to="/perfil">
          <img
            src={ profileicon }
            alt="avatar-user"
            className="user-avatar"
            data-testid="profile-top-btn"
          />
        </Link>
        <p>{ userName }</p>
      </div>
      <div className="title-header" data-testid="page-title">
        <h1>{ title }</h1>
      </div>
      <div className="search" data-testid="search-top-btn">
        <img
          src={ searchicon }
          alt="serchIcon"
          data-testid="search-top-btn"
        />
      </div>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
