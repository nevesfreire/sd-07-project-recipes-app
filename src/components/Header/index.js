import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { profileIcon, searchIcon } from '../../images';

import SearchBar from '../SearchBar';

import { StyledCard, StyledNavbar, StyledImage, StyledTitle } from './styles';

function Header(props) {
  const history = useHistory();
  const [propsState, setPropsState] = useState(props);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { title, showSearchIcon } = propsState;

  useEffect(() => {
    setPropsState(props);
  }, [props]);

  return (
    <StyledNavbar
      sticky="top"
      className="justify-content-between"
    >
      <StyledCard>
        <StyledCard.Header>
          <StyledImage
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Icone de perfil"
            onClick={ () => history.push('/perfil') }
          />
          <StyledTitle
            data-testid="page-title"
          >
            { title }
          </StyledTitle>
          {
            showSearchIcon
            && (
              <StyledImage
                src={ searchIcon }
                alt="Search"
                data-testid="search-top-btn"
                onClick={ () => setShowSearchBar(!showSearchBar) }
              />
            )
          }
        </StyledCard.Header>
        {showSearchBar
        && <StyledCard.Body><SearchBar /></StyledCard.Body> }
      </StyledCard>
    </StyledNavbar>
  );
}

export default Header;
