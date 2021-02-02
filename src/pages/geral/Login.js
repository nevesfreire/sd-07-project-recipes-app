import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <h1 className="text-center">
          Login
        </h1>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="text"
            data-testid="email-input"
            placeholder="Email address"
            value={ email }
            name="email"
            onChange={ (event) => this.handleChange(event) }
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="password"
            data-testid="password-input"
            placeholder="Password"
            value={ password }
            name="password"
            onChange={ (event) => this.handleChange(event) }
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" />
          Check me out
        </div>

        <div className="form-floating">
          <button
            type="button"
            className="btn btn-outline-success form-control"
            data-testid="login-submit-btn"
            disabled={ !regexEmail.test(email) || password.length <= regexPassword }
            onClick={ () => this.handleClick() }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
};

export default Login;
