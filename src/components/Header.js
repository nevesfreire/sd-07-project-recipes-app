import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { setToggle } from '../actions/actionSearchToggle';

import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

function Header({ title, toggle, toggleAction }) {
  return (
    <header>
      <div>
        <Link to="/perfil" data-testid="profile-top-btn">
          <img src={ ProfileIcon } alt="perfil" />
        </Link>
      </div>
      <div>
        <h2 data-testid="page-title">
          { title }
        </h2>
      </div>
      <div>
        <button
          type="button"
          data-testid="search-top-btn"
          onClick={ () => toggleAction(!toggle) }
        >
          <img src={ SearchIcon } alt="search" />
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  toggle: PropTypes.bool.isRequired,
  toggleAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ searchToggleReducer }) => ({
  toggle: searchToggleReducer,
});

const mapDispatchToProps = (dispatch) => ({
  toggleAction: (toggle) => dispatch(setToggle(toggle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
