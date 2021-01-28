import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Profile({ history, search = false }) {
  return (
    <>
      <Header history={ history } search={ search } />
      <p>Profile</p>
      <Footer />
    </>
  );
}

Profile.defaultProps = { search: false };

Profile.propTypes = {
  search: PropTypes.bool,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Profile;
