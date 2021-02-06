import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import propTypes from 'prop-types';
import RecipesContext from '../providers/Context/Context';
import ImgPerfil from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBarComp from './SearchbarComp';

const Header = ({ children }) => {
  const { pathname } = useLocation();
  const { searchBar, changeSearchBarState } = useContext(RecipesContext);
  const path = '/explorar/comidas/area';

  return (
    <>
      <header className="heads">
        <Link to="/perfil">
          <button
            className="icon-btn"
            type="button"
            data-testid="profile-top-btn"
            src={ ImgPerfil }
          >
            <img src={ ImgPerfil } alt="SVG Perfil" />
          </button>
        </Link>
        <h2 data-testid="page-title">{children}</h2>
        {(children === 'Comidas' || children === 'Bebidas' || pathname === path) && (
          <button
            className="icon-btn"
            type="button"
            onClick={ () => {
              changeSearchBarState();
            } }
          >
            <img data-testid="search-top-btn" src={ searchIcon } alt="SVG Search" />
          </button>
        )}
      </header>
      {searchBar && <SearchBarComp context={ children } />}
    </>
  );
};

Header.propTypes = {
  children: propTypes.node.isRequired,
};

export default Header;
