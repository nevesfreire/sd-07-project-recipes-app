import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmail } from '../actions';
import '../styles/Login.css';
import ChimaHooks from '../images/ChimaHooks.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.verifyEmailAndPassword = this.verifyEmailAndPassword.bind(this);
  }

  handleSubmit() {
    const { sendEmail, history } = this.props;
    const { email } = this.state;
    sendEmail(email);
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const emailInfo = JSON.stringify({ email });
    localStorage.setItem('user', emailInfo);
    history.push('/comidas');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  verifyEmailAndPassword() {
    const { email, password } = this.state;
    const minLength = 6;
    const re = /\S+@\S+\.\S+/;
    return re.test(email) && password.length >= minLength;
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="login-page">
        <div className="login-content">
          <form className="form">
            <h1 className="form-title">ChimaHooks</h1>
            <img
              src={ ChimaHooks }
              alt="ChimaHooks"
              className="logo"
            />
            <input
              placeholder="Digite seu email"
              data-testid="email-input"
              value={ email }
              onChange={ this.handleChange }
              name="email"
              className="form-input"
            />
            <input
              placeholder="Digite sua senha"
              data-testid="password-input"
              type="password"
              value={ password }
              onChange={ this.handleChange }
              name="password"
              className="form-input"
            />
            <button
              type="button"
              data-testid="login-submit-btn"
              disabled={ !this.verifyEmailAndPassword() }
              onClick={ this.handleSubmit }
              className="form-button"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (email) => dispatch(getEmail(email)),
});

Login.propTypes = {
  sendEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
