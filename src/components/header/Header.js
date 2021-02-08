import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import '../../App.css';
import * as action from '../../redux/actionsSearchBar';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.redirectPerfil = this.redirectPerfil.bind(this);
  }

  redirectPerfil() {
    const { history } = this.props;
    history.push('/perfil');
  }

  render() {
    const { title, toggleSearchBar } = this.props;
    return (
      <div className="header-content">
        <button
          className="header-button"
          type="button"
          data-testid="profile-top-btn"
          onClick={ this.redirectPerfil }
          src={ profileIcon }
        >
          <img src={ profileIcon } alt="profile icon" />
        </button>
        <div data-testid="page-title">{title}</div>
        <button type="button" onClick={ toggleSearchBar } className="header-button">
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
  toggleSearchBar: () => dispatch(action.toggleSearchBar()),
});

Header.propTypes = {
  title: PropTypes.string.isRequired,
  toggleSearchBar: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Header);
