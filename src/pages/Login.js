import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendEmail } from '../actions';

class Login extends Component {
  render() {
    const { updateEmail } = this.props;
    return (
      <div>
        <input type="email" placeholder="Digite seu e-mail" data-testid="email-input" />
        <input
          type="password"
          placeholder="Digite sua senha"
          data-testid="password-input"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          onClick={ () => updateEmail('xablau@xablau.com') }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateEmail: (email) => dispatch(sendEmail(email)),
});

Login.propTypes = {
  updateEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
