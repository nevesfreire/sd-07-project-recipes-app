import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div>
        <input
          type="email"
          name="email"
          data-testid="email-input"
          value={ email }
          // onChance={}
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          value={ password }
          // onChange={}
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          // disabled={}
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
