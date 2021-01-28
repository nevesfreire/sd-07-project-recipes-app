import React from 'react';
import PropTypes from 'prop-types';

import searchIcon from '../../../images/searchIcon.svg';

export default function SearchButton(props) {
  const { pathname } = props;
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
        />}
    </div>
  );
}

SearchButton.propTypes = {
  pathname: PropTypes.string.isRequired,
};
