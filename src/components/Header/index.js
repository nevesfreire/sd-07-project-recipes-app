import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { profileIcon, searchIcon } from '../../images';

import SearchBar from '../SearchBar';

import { StyledCard, StyledAccordion, StyledImage, StyledTitle } from './styles';

function Header(props) {
  const history = useHistory();

  function handleClick() {
    history.push('/perfil');
  }
  const [propsState] = useState(props);

  const { title, showSearchBar } = propsState;

  return (
    <StyledAccordion>
      <StyledCard>
        <StyledCard.Header>
          <StyledImage
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Icone de perfil"
            onClick={ handleClick }
          />
          <StyledTitle
            data-testid="page-title"
          >
            { title }
          </StyledTitle>
          {
            showSearchBar
            && (
              <StyledAccordion.Toggle
                as={ StyledImage }
                eventKey="0"
                src={ searchIcon }
                alt="Search"
                data-testid="search-top-btn"
              />

            )
          }
        </StyledCard.Header>
        <StyledAccordion.Collapse eventKey="0">
          <StyledCard.Body><SearchBar /></StyledCard.Body>
        </StyledAccordion.Collapse>
      </StyledCard>
    </StyledAccordion>
  );
}

export default Header;
