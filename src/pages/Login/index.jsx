import React from 'react';
import './Login.css';

export default function Login() {
  return (
    <div className="login-container">
      <label htmlFor="email">
        E-mail:
        <input
          type="email"
          name="email"
          data-testid="email-input"
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          type="password"
          name="password"
          data-testid="password-input"
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </div>
  );
}
