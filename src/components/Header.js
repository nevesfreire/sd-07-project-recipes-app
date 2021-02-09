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
        <div>
          <Link to="/perfil">
            <img
              className="title"
              src={ profileIcon }
              alt="Imagem do profile"
              data-testid="profile-top-btn"
            />
          </Link>
          <button type="button" onClick={(e) => toggleSearchBar(e)}>
            <img
              src={ searchIcon }
              alt="Imagem do profile"
              data-testid="search-top-btn"
            />
          </button>
        </div>
        <div>
          <h2 className="title" data-testid="page-title">
            {title}
          </h2>
        </div>
      </header>
      {showSearchBar && <HeaderSearchBar />}
    </div>
  );
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Header;
