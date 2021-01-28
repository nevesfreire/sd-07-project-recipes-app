import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function Header() {
  const [enableSearch, setEnableSearch] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;
  return (
    <div>
      <header>
        <Link
          to="/perfil"
          data-testid="profile-top-btn"
        >
          <img src="../../images/profileIcon.svg" alt="profile" />
        </Link>

        <span data-testid="page-title">Titulo Variável</span>
        {
          (pathname === '/comidas'
            || pathname === '/bebidas'
            || pathname === '/explorar/comidas/area'
            || pathname === '/explorar/bebidas/area')
          && (
            <button
              type="button"
              data-testid="search-top-btn"
              onClick={ () => setEnableSearch(!enableSearch) }
            >
              <img src="../../images/profileIcon.svg" alt="" />
            </button>
          )
        }
      </header>
    </div>
  );
}
