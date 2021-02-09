import React, { useState } from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { profileIcon, searchIcon } from '../../images';
import SearchBar from './SearchBar';
import './style.css';

const profileButtonPaths = [
  '/comidas',
  '/bebidas',
  '/explorar/comidas/area',
  '/explorar',
  '/explorar/comidas',
  '/explorar/bebidas',
  '/explorar/comidas/ingredientes',
  '/explorar/bebidas/ingredientes',
  '/perfil',
  '/receitas-feitas',
  '/receitas-favoritas',
];

const searchButtonPaths = [
  '/comidas',
  '/bebidas',
  '/explorar/comidas/area',
];

export default function Header({ title }) {
  const history = useHistory();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { pathname } = history.location;
  const renderProfileButton = profileButtonPaths.find((e) => e === pathname);
  const renderSearchButton = searchButtonPaths.find((e) => e === pathname);

  return (
    <div>
      <header>
        { renderProfileButton
          && (
            <div className="header">
              <Navbar bg="light" fixed="top" className="justify-content-between">
                <Navbar.Brand>
                  <button
                    className="profile-top-btn"
                    type="button"
                    onClick={ () => history.push('/perfil') }
                  >
                    <img
                      data-testid="profile-top-btn"
                      alt="Icone de perfil"
                      src={ profileIcon }
                    />
                  </button>
                </Navbar.Brand>
                <Navbar.Brand className="title-container" data-testid="page-title">
                  <h2 className="title">{title}</h2>
                </Navbar.Brand>
                <Navbar.Collapse>
                  <Form inline>
                    { renderSearchButton && <SearchBar /> }
                  </Form>
                </Navbar.Collapse>
              </Navbar>
            </div>
          )}
      </header>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
