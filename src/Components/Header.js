import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import RecipesContext from '../providers/Context/Context';
import ImgPerfil from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBarComp from './SearchbarComp';

const Header = ({ children }) => {
  const { searchBar, changeSearchBarState } = useContext(RecipesContext);

  return (
    <header>
      <Link to="/perfil">
        <button type="button" data-testid="profile-top-btn">
          <img src={ ImgPerfil } alt="SVG Perfil" />
        </button>
      </Link>
      <h2 data-testid="page-title">{children}</h2>
      {(children === 'Comidas' || children === 'Bebidas') && (
        <button
          type="button"
          onClick={ () => {
            changeSearchBarState();
          } }
        >
          <img data-testid="search-top-btn" src={ searchIcon } alt="SVG Search" />
        </button>
      )}
      {searchBar && <SearchBarComp context={ children } />}
    </header>
  );
};

Header.propTypes = {
  children: propTypes.node.isRequired,
};

export default Header;
