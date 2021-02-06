import React from 'react';
import { Redirect } from 'react-router-dom';

import useLogin from '../hooks/useLogin';
import '../styles/FormLogin.css';
import logo from '../images/logo_Login.png';

function FormLogin() {
  const [email, password, route, getFilterEmail, handlerChangeLogin,
    handlerClickLogin] = useLogin();

  if (route) return <Redirect to="/comidas" />;

  return (
    <div className="container">

      <div className="form-content">

        <img src={ logo } alt="React Tomperos" />

        <input
          type="text"
          name="email"
          data-testid="email-input"
          placeholder="e-mail"
          onChange={ handlerChangeLogin }
        />

        <input
          type="password"
          name="password"
          data-testid="password-input"
          placeholder="senha"
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
        <div className="new-itens">
          <label htmlFor="checkLogado">
            <input type="checkbox" name="lembrarLogin" id="checkLogado" />
            Lembrar-me
          </label>
          <p>Esqueceu sua senha?</p>
        </div>
      </div>
    </div>

  );
}

export default FormLogin;
