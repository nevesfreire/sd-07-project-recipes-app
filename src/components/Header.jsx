import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import imageProfile from '../images/profileIcon.svg';
import imageSearch from '../images/searchIcon.svg';

import { titleHeaderNames, useTitleContext } from '../context/TitleContext';

function Header() {
  const { setHeaderName } = useTitleContext();
  const explorerOrigin = <h1 data-testid="page-title">Explorar Origem</h1>;

  const path = useHistory().location.pathname;

  const renderTitlePage = path.split('/').join('').split('-').join('');
  console.log(renderTitlePage);

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
    if (path === '/comidas' || path === '/bebidas') {
      return (
        <div>
          {elementProfile}
          {titleNamePage}
          {elementSearch}
        </div>
      );
    }
    if (path === '/explorar/comidas/area') {
      return (
        <div>
          {elementProfile}
          {explorerOrigin}
          {elementSearch}
        </div>
      );
    }
    if (path === '/') return null;
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
