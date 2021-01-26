import React from 'react';

function Login() {
  return (
    <div>
      <label htmlFor="email">
        Email:
        <br />
        <input
          type="email"
          data-testid="email-input"
          id="email"
        />
      </label>
      <br />
      <label htmlFor="password">
        Pass:
        <br />
        <input
          type="password"
          data-testid="password-input"
          id="password"
        />
      </label>
      <br />
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
