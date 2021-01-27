import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import userProfile from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import '../../App.css';

export default class Header extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <div className="header-content">
        <div>
          <Link to="/perfil">
            <img data-testid="profile-top-btn" src={ userProfile } alt="profile icon" />
          </Link>
        </div>
        <div data-testid="page-title">{title}</div>
        <div>
          <img data-testid="search-top-btn" src={ searchIcon } alt="search icon" />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
