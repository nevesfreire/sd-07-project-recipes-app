import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Explorar from '../components/Explorar';
import Footer from '../components/Footer';
import PerfilAndSeach from '../components/PerfilAndSeach';

function MainExplore(props) {
  const { history } = props;
  return (
    <div className="container">
      <Header pathName={ history } />
      <PerfilAndSeach pathName={ history } />
      <Explorar />
      <Footer />
    </div>
  );
}

MainExplore.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MainExplore;
