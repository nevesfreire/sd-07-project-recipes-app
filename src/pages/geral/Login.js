import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { email } = this.state;
    const { history } = this.props;
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  }

  render() {
    const { email, password } = this.state;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
    const regexPassword = 6;
    return (
      <div>
        <h1>
          Login
        </h1>
        <input
          type="text"
          data-testid="email-input"
          placeholder="E-Mail"
          value={ email }
          name="email"
          onChange={ (event) => this.handleChange(event) }
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Senha"
          value={ password }
          name="password"
          onChange={ (event) => this.handleChange(event) }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !regexEmail.test(email) || password.length <= regexPassword }
          onClick={ () => this.handleClick() }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
};

export default Login;
