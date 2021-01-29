import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import ProfileDetails from '../components/ProfileDetails';
import '../css/profile.css';

class Profile extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <header>
          <h1 data-testid="page-title">Perfil</h1>
        </header>
        <ProfileDetails history={ history } />
        <Footer history={ history } />
      </div>
    );
  }
}

export default Profile;

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
