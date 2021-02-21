import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PerfilAndSeach from '../components/PerfilAndSeach';

function MainProfile(props) {
  const { history } = props;
  return (
    <div className="container">
      <Header pathName={ history } />
      <PerfilAndSeach pathName={ history } />
      <Footer />
    </div>
  );
}

MainProfile.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MainProfile;
