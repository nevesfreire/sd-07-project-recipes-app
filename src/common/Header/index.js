import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AppContext } from '../../context/AppContext';

import TitleHeader from './components/TitleHeader';
import ProfileButton from './components/ProfileButton';
import SearchBar from '../SearchBar';
import searchIcon from '../../images/searchIcon.svg';

export default function Header() {
  const { pathname } = useHistory().location;
  const { inputStatus, setInputStatus } = useContext(AppContext);
  const { searchInput } = inputStatus;

  function hedleChange() {
    setInputStatus({ searchInput: !searchInput });
    return (console.log(inputStatus.searchInput));
  }

  return (
    <div>
      <div>
        <TitleHeader pathname={ pathname } />
      </div>

      <div>
        <ProfileButton />
      </div>

      <div>
        {(pathname !== ('/explorar')
        && pathname !== ('/explorar/comidas')
        && pathname !== ('/explorar/bebidas')
        && pathname !== ('/explorar/comidas/ingredientes')
        && pathname !== ('/explorar/bebidas/ingredientes')
        && pathname !== ('/perfil')
        && pathname !== ('/receitas-feitas')
        && pathname !== ('/receitas-favoritas'))
        && <input
          src={ searchIcon }
          id="search-icon"
          type="image"
          alt="search-image"
          data-testid="search-top-btn"
          onClick={ () => hedleChange() }
        />}
      </div>
      { searchInput && <SearchBar /> }
    </div>
  );
}
