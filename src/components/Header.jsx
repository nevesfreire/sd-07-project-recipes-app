import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import imageProfile from '../images/profileIcon.svg';
import imageSearch from '../images/searchIcon.svg';
import { titleHeaderNames, useTitleContext } from '../context/TitleContext';
import Search from './Search';

function Header() {
  const { titleHeaderName, setHeaderName } = useTitleContext();
  const [toggle, setToggle] = useState(false);

  let path = useHistory().location.pathname;

  function routeLoadToState() {
    const renderTitlePage = path.split('/').join('').split('-').join('');
    setHeaderName(titleHeaderNames[renderTitlePage]);
  }

  useEffect(() => {
    routeLoadToState();
  }, []);

  if (path === undefined) path = titleHeaderName;

  function checkIsNumber(elem) {
    if (Number.isNaN(elem)) {
      return false;
    }
    return true;
  }

  const checkDetails = checkIsNumber(parseInt(path.split('/')[2], 10));

  const renderTitlePage = path.split('/').join('').split('-').join('');

  const elementProfile = (
    <Link to="/perfil">
      <button
        type="button"
        className="element-header button"
        onClick={ () => setHeaderName(titleHeaderNames.perfil) }
      >
        <img
          className="svg-class"
          data-testid="profile-top-btn"
          src={ imageProfile }
          alt="Perfil"
        />
      </button>
    </Link>
  );

  const elementSearch = (
    <div className="element-header">
      <button
        className="button"
        type="button"
        onClick={ () => setToggle(!toggle) }
      >
        <img
          className="svg-class"
          data-testid="search-top-btn"
          src={ imageSearch }
          alt="Buscar"
        />
      </button>
    </div>
  );

  const lengthPath = titleHeaderNames[renderTitlePage];
  let titleNamePage;
  if (lengthPath !== undefined) {
    titleNamePage = (
      <h1
        className="element-header center"
        data-testid="page-title"
      >
        {titleHeaderName.title}
      </h1>
    );
  }

  function renderHeader() {
    if (path === '/comidas' || path === '/bebidas' || path === '/explorar/comidas/area') {
      return (
        <div>
          <div className="header-div">
            {elementProfile}
            {titleNamePage}
            {elementSearch}
          </div>
          {toggle ? <Search /> : <div />}
        </div>
      );
    }
    if (path === '/' || checkDetails === true) return null;
    return (
      <div className="header-div">
        {elementProfile}
        {titleNamePage}
      </div>
    );
  }

  return renderHeader();
}

export default Header;
