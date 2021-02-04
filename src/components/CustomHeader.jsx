import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import search from '../images/searchIcon.svg';
import profile from '../images/profileIcon.svg';
import { CustomSearchBar } from '.';

export default function CustomHeader({
  route = '/perfil',
  title,
  showSearchTopBtn = true,
}) {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const routeChange = () => {
    history.push(route);
  };
  const showSearchBar = () => {
    setShow(!show);
  };
  return (
    <header>
      <h1 data-testid="page-title">{title}</h1>
      <button
        type="button"
        onClick={ routeChange }
        data-testid="profile-top-btn"
        src={ profile }
      >
        <img src={ profile } alt="profile" />
      </button>
      {showSearchTopBtn
      && title !== 'Explorar'
      && title !== 'Receitas Favoritas'
      && title !== 'Receitas Feitas'
        ? (
          <div>
            <button
              type="button"
              data-testid="search-top-btn"
              onClick={ () => showSearchBar() }
              src={ search }
            >
              <img src={ search } alt="buscar" />
            </button>
            {show && <CustomSearchBar title={ title } />}
          </div>
        )
        : null}
    </header>
  );
}
CustomHeader.propTypes = {
  route: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  showSearchTopBtn: PropTypes.bool.isRequired,
};
