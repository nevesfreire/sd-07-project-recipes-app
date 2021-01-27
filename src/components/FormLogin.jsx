import React from 'react';
import { Redirect } from 'react-router-dom';

import useLogin from '../hooks/useLogin';
import '../styles/login.css';

function FormLogin() {
  const [email, password, route, getFilterEmail, handlerChangeLogin,
    handlerClickLogin] = useLogin();

  if (route) return <Redirect to="/comidas" />;

  return (
    <div className="form-login">

      <h1>Login</h1>

      <input
        type="text"
        name="email"
        data-testid="email-input"
        onChange={ handlerChangeLogin }
      />

      <input
        type="password"
        name="password"
        data-testid="password-input"
        onChange={ handlerChangeLogin }
      />

      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ getFilterEmail(email, password) }
        onClick={ handlerClickLogin }
      >
        Entrar
      </button>
    </div>
  );
}

export default FormLogin;
