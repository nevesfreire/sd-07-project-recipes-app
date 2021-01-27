import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon';
import searchIcon from '../images/searchIcon';


export default function Header() {
  return (
    <header className="">
      <Link to="/profile" data-testid="profile-top-btn">
        <img
          alt=""
          src={ profileIcon }
        ></img>
      </Link>
      <h2 data-testid="page-title">Comidas</h2>
      <Link to="/serach" data-testid="search-top-btn">
        <img
          alt=""
          src={ searchIcon }
        ></img>
      </Link>
    </header>
  );
}
