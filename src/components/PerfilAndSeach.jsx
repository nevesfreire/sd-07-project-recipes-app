import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import context from '../contextApi/context';
import useRedirect from '../hooks/useRedirect';

function PerfilAndSeach({ pathName }) {
  const wrongPath = [
    '/perfil',
    '/explorar',
    '/explorar/comidas',
    '/explorar/bebidas',
    '/explorar/comidas/area',
    '/explorar/comidas/ingredientes',
    '/explorar/bebidas/ingredientes',
  ];

  const { location: { pathname } } = pathName;
  const PATH = '/perfil';
  const [setPath] = useRedirect();
  const { changeClick, change } = useContext(context);

  return (
    <div className="rigth-side-icons">
      {
        wrongPath.includes(pathname) ? null : (
          <div className="icon-search">
            <Button
              type="button"
              onClick={ () => changeClick(!change) }
            >
              <img data-testid="search-top-btn" src={ searchIcon } alt="button" />
            </Button>
          </div>
        )

      }
      <div className="icon-profile">
        <Button
          type="button"
          onClick={ () => setPath(PATH) }
        >
          <img data-testid="profile-top-btn" src={ profileIcon } alt="button" />
        </Button>
      </div>
    </div>
  );
}

PerfilAndSeach.propTypes = {
  pathName: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PerfilAndSeach;
