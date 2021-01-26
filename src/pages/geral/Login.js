import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div>
        <h1>
          Login
        </h1>
        <input
          type="text"
          data-testid="email-input"
          placeholder="E-Mail"
        />
        <input
          type="text"
          data-testid="password-input"
          placeholder="Senha"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
