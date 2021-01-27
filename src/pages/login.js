import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      auth: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.click = this.click.bind(this);
  }

  handleChange({ taget: { email, value } }) {
    this.setState({ [email]: value });
    this.emailValidation();
  }

  emailValidation() {
    const { email, password, auth } = this.state;
    const magicNumber = 6;
    if (email.match(/\S+@\S+\.\S+/) && password.length < magicNumber) {
      return this.setState({ auth: true });
    }
  }

  async click() {
    const { emailDispatch, passwdDispatch, history } = this.props;
    const { email, password } = this.state;
    emailDispatch(email);
    passwdDispatch(password);
    history.push('/explorar');
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <div>
          <input
            type="email"
            placeholder="Seu email"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ (e) => this.handleChange(e) }
          />
        </div>
        <div>
          <input
            type="password"
            id="input-password"
            placeholder="Sua senha"
            name="password"
            value={ password }
            data-testid="password-input"
            onChange={ (e) => this.handleChange(e) }
          />
        </div>
      </div>
        <br />
        <button
          data-testid="login-submit-btn"
          type="button"
          onClick={ this.click }
        >
          Entrar
        </button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailDispatch: PropTypes.func.isRequired,
  passwdDispatch: PropTypes.func.isRequired,
  token: PropTypes.func.isRequired,
  history: PropTypes.shape(PropTypes.object).isRequired,
});

export default connect(null, mapDispatchToProps)(Login);
