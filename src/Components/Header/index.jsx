import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../App.css';

// import searchicon from ''
// import profileicon from '../../images/profileico.svg';

const userName = 'Filipi Firmino';
const Header = (props) => (
  <div className="header">
    <div className="user" data-testid="profile-top-btn">
      <Link to="/perfil">
        <img src="./src/images/profileico.svg" alt="avatar-user" className="user-avatar" />
        <p>{ userName }</p>
      </Link>
    </div>
    <div className="title-header" data-testid="page-title">
      <h1>{ props.title }</h1>
    </div>
    <div className="search" data-testid="search-top-btn">
      <img src="./src/images/searchicon.svg" alt="serchIcon" />
    </div>
  </div>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
