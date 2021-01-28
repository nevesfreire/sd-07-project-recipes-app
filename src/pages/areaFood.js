import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchHeaderBar from '../components/SearchHeaderBar';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function AreaFood() {
  const { searchClick } = useContext(RecipeContext);
  const { showBtn } = useContext(RecipeContext);
  return (
    <div>
      <header>
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="profile icon"
            data-testid="profile-top-btn"
          />
        </Link>
        <h1 data-testid="page-title">Explorar Origem</h1>
        <label htmlFor="searchBtn">
          <input
            type="image"
            src={ searchIcon }
            alt="profile icon"
            data-testid="search-top-btn"
            id="searchBtn"
            onClick={ () => searchClick() }
          />
        </label>
        { showBtn && <SearchHeaderBar /> }
      </header>
      <Footer />
    </div>
  );
}

export default AreaFood;
