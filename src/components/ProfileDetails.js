import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class ProfileDetails extends Component {
  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user.email);
    return (
      <div>
        <div data-testid="profile-email">
          {user.email}
        </div>
        <div>
          <button type="button" data-testid="profile-done-btn">
            Receitas Feitas
          </button>
          <button type="button" data-testid="profile-favorite-btn">
            Receitas Favoritas
          </button>
          <button type="button" data-testid="profile-logout-btn">
            Sair
          </button>
        </div>
      </div>
    );
  }
}

export default ProfileDetails;

// Profile.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func,
//   }).isRequired,
// };
