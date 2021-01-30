import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchHeader from './SearchHeader';
import GlobalContext from '../context/GlobalContext';
import { HeaderStyle } from './style';

function Header() {
  const {
    title,
    searchButton,
    searchBar,
    setSearchBar,
  } = useContext(GlobalContext);

  const {
    Container,
    InfoDisplay,
    Btn,
    SearchContainer,
    SearchIcon,
  } = HeaderStyle;

  const handleClick = () => {
    if (searchBar) {
      setSearchBar(false);
    } else {
      setSearchBar(true);
    }
  };

  const handlerSearchBtn = () => (
    <Btn
      type="button"
      onClick={ () => handleClick() }
    >
      <SearchIcon src={ searchIcon } data-testid="search-top-btn" alt="Search Icon" />
    </Btn>
  );

  return (
    <Container>
      <InfoDisplay>
        <Link to="/perfil">
          <img
            src={ profileIcon }
            data-testid="profile-top-btn"
            alt="Profile Icon"
          />
        </Link>

        <h1 data-testid="page-title">{title}</h1>
      </InfoDisplay>

      <SearchContainer>
        {searchButton && handlerSearchBtn()}
        {searchBar && <SearchHeader />}
      </SearchContainer>
    </Container>
  );
}

export default Header;
