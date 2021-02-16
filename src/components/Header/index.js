import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';
import profileIcon from '../../images/profileIcon.svg';

class Header extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Profile link"
          />
        </Navbar.Brand>
        <Navbar.Brand>
          <h3 data-testid="page-title">{ title }</h3>
        </Navbar.Brand>
      </Navbar>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
