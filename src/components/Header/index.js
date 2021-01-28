import React from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import './styles.css';

export default function Footer() {
  return (
    <div data-testid="header" className="header">
      <Link src={ profileIcon } to="/profile" data-testid="profile-top-btn">
        <img
          alt=""
          src={ profileIcon }/>
      </Link>
      <h2 data-testid="page-title">Comidas</h2>
      <Link src={ searchIcon } to="/profile" data-testid="search-top-btn">
        <img
          alt=""
          src={ searchIcon }/>
      </Link>
    </div>
  );
}
