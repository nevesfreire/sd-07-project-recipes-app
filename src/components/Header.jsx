import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import imageProfile from '../images/profileIcon.svg';
import imageSearch from '../images/searchIcon.svg';

import { titleHeaderNames, useTitleContext } from '../context/TitleContext';

function Header() {
  const { setHeaderName } = useTitleContext();

  const path = useHistory().location.pathname;

  function checkIsNumber(elem) {
    if (Number.isNaN(elem)) {
      return false;
    }
    return true;
  }

  const checkDetails = checkIsNumber(parseInt(path.split('/')[2], 10));
  console.log(checkDetails);

  const renderTitlePage = path.split('/').join('').split('-').join('');

  const elementProfile = (
    <Link to="/perfil">
      <button
        type="button"
        className="profile"
        onClick={ () => setHeaderName(titleHeaderNames[0].perfil) }
      >
        <img
          data-testid="profile-top-btn"
          src={ imageProfile }
          alt="Perfil"
        />
      </button>
    </Link>
  );

  const elementSearch = (
    <div className="search">
      <img
        data-testid="search-top-btn"
        src={ imageSearch }
        alt="Buscar"
      />
    </div>
  );

  const lengthPath = titleHeaderNames[0][renderTitlePage];
  let titleNamePage;
  if (lengthPath !== undefined) {
    titleNamePage = (
      <h1 data-testid="page-title">{titleHeaderNames[0][renderTitlePage].title}</h1>
    );
  }

  function renderHeader() {
    if (path === '/comidas' || path === '/bebidas' || path === '/explorar/comidas/area') {
      return (
        <div>
          {elementProfile}
          {titleNamePage}
          {elementSearch}
        </div>
      );
    }
    if (path === '/' || checkDetails === true) return null;
    return (
      <div>
        {elementProfile}
        {titleNamePage}
      </div>
    );
  }
  return (
    <div id="headerNotLoaded">{renderHeader()}</div>
  );
}

export default Header;
