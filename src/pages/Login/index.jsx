import React from 'react';

function Login() {
  return (
    <form>
      <label htmlFor="email">
        Email:
        <input
          required
          name="email"
          type="email"
          data-testid="email-input"
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          required
          name="password"
          type="text"
          data-testid="password-input"
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
