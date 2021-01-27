import React, { useState } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import AddInput from './InputPesquisa';

function Header({ text, search }) {
  const [renderComponent, setRenderComponent] = useState(false);

  return (
    <div>
      <a
        href="/perfil"
        type="button"
        data-testid="profile-top-btn"
        src={ profileIcon }
      >
        <img
          alt="profile"
          src={ profileIcon }
        />
      </a>
      <div data-testid="page-title">{text}</div>
      { search
        && (
          <button
            type="button"
            onClick={ () => setRenderComponent(!renderComponent) }
            data-testid="search-top-btn"
            src={ searchIcon }
          >
            <img
              alt="search"
              src={ searchIcon }
            />
          </button>)}
      { renderComponent && <AddInput /> }
    </div>
  );
}

Header.propTypes = {
  text: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;
