import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import RecipesContext from '../context/RecipesContext';
import HeaderSearchBar from './HeaderSearchBar';

function Header({ title }) {
  const { toggleSearchBar, showSearchBar } = useContext(RecipesContext);
  return (
    <div>
      <header>
        <Link to="/perfil">
          <img
            className="title"
            src={ profileIcon }
            alt="Imagem do profile"
            data-testid="perfil-top-btn"
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
        <button type="button" onClick={ (e) => toggleSearchBar(e) }>
          <img
            src={ searchIcon }
            alt="Imagem do profile"
            data-testid="search-top-btn"
          />
        </button>
      </header>
      { showSearchBar && <HeaderSearchBar />}
    </div>
  );
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Header;
