import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import userProfile from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import '../../App.css';
import { toggleSearchBar } from '../../redux/actionsSearchBar';

class Header extends React.Component {
  render() {
    const { title, toggleSearchBar } = this.props;
    return (
      <div className="header-content">
        <div>
          <Link to="/perfil">
            <img data-testid="profile-top-btn" src={ userProfile } alt="profile icon" />
          </Link>
        </div>
        <div data-testid="page-title">{title}</div>
        <button type="button" onClick={ toggleSearchBar }>
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search icon"
          />
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleSearchBar: () => dispatch(toggleSearchBar()),
});

Header.propTypes = {
  title: PropTypes.string.isRequired,
  toggleSearchBar: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Header);
