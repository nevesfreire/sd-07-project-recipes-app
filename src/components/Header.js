import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import RecipeContext from '../context/RecipeContext';

function Header() {
  const { searchClick } = useContext(RecipeContext);
  const history = useHistory();
  const arrayRoutes = ['/comidas', '/bebidas', '/explorar/comidas/area'];
  const titleGeneration = () => {
    const path = history.location.pathname;
    const titleArray = path.split('/');
    const zero = 0;
    const two = 2;
    const titleMap = titleArray.map((palavra) => (palavra.length > zero
      ? palavra.replace(palavra.charAt(zero), palavra.charAt(zero).toUpperCase())
      : ''));
    const title = titleMap.length > two
      ? `${titleMap[1]} ${titleMap[two]}`
      : `${titleMap[1]}`;
    return title;
  };

  return (
    <div className="header">
      <Link to="/perfil">
        <img
          src={ profileIcon }
          alt="profile icon"
          data-testid="profile-top-btn"
        />
      </Link>

      <h1 data-testid="page-title">
        { titleGeneration() }
      </h1>

      {

        arrayRoutes.includes(history.location.pathname) && (
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
        )
      }
    </div>
  );
}

export default Header;
