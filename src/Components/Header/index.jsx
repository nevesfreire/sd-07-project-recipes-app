import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchIcon from '../../images/searchicon';
import profileIcon from '../../images/profileico';

const userName = 'Filipi Firmino';
const Header = (props) => (
  <div className="header">
    <div className="user" data-test-id="profile-top-btn">
      <Link to="/perfil">
        <img src={ profileIcon } alt="avatar-user" className="user-avatar" />
        <p>{ userName }</p>
      </Link>
    </div>
    <div className="title-header" data-test-id="page-title">
      <h1>{ props.title }</h1>
    </div>
    <div className="search" data-test-id="search-top-btn">
      <img src={ SearchIcon } alt="serchIcon" />
    </div>
  </div>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
