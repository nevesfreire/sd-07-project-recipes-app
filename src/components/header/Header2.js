import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../../images/profileIcon.svg';
import '../../App.css';

class Header2 extends React.Component {
  constructor(props) {
    super(props);
    this.redirectPerfil = this.redirectPerfil.bind(this);
  }

  redirectPerfil() {
    const { history } = this.props;
    history.push('/perfil');
  }

  render() {
    const { title } = this.props;
    return (
      <div className="header-content">
        <button
          type="button"
          data-testid="profile-top-btn"
          onClick={ this.redirectPerfil }
          src={ profileIcon }
        >
          <img src={ profileIcon } alt="profile icon" />
        </button>
        <div data-testid="page-title">{title}</div>
      </div>
    );
  }
}

Header2.propTypes = {
  title: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Header2;
