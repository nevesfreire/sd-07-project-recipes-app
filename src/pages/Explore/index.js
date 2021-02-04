import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Feed, Meals, Drinks, Ingredients } from '../../components/Explorers';

function Explore({ history, search = false }) {
  const { location: { pathname } } = history;
  const [path, setPath] = useState('');

  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  return (
    <>
      <Header history={ history } search={ search } />
      {path === '/explorar' && <Feed />}
      {path === '/explorar/comidas' && <Meals path={ path } />}
      {path === '/explorar/bebidas' && <Drinks path={ path } />}
      {path === '/explorar/comidas/ingredientes' && <Ingredients path={ path } />}
      {path === '/explorar/bebidas/ingredientes' && <Ingredients path={ path } />}
      <Footer />
    </>
  );
}

Explore.defaultProps = { search: false };

Explore.propTypes = {
  search: PropTypes.bool,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Explore;
