import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../../context/AppContext';
import SearchBar from '../../SearchBar';
import searchIcon from '../../../images/searchIcon.svg';

export default function SearchButton(props) {
  const { pathname } = props;
  const { inputStatus, setInputStatus } = useContext(AppContext);
  const { searchInput } = inputStatus;

  function hedleChange() {
    return setInputStatus({ searchInput: !searchInput });
  }

  return (
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
      { searchInput && <SearchBar /> }
    </div>
  );
}

SearchButton.propTypes = {
  pathname: PropTypes.string.isRequired,
};
