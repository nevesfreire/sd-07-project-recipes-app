import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function verifyEmail() {
    const r = /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/;
    const validateEmail = r.test(email);
    return validateEmail;
  }

  function verifyPassword() {
    const SIX = 6;
    const validatePassword = password.length > SIX;
    return validatePassword;
  }

  function verifyLogin() {
    const verifyFNEmail = verifyEmail();
    const verifyFNPassword = verifyPassword();

    if (verifyFNEmail && verifyFNPassword) {
      return false;
    }
    return true;
  }

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Digite seu e-mail"
          data-testid="email-input"
          onChange={ (e) => setEmail(e.target.value) }
        />

        <input
          type="password"
          placeholder="Digite sua senha"
          data-testid="password-input"
          onChange={ (e) => setPassword(e.target.value) }
        />

        <Link to="/comidas">
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ verifyLogin() }
            // onClick={ () =>  }
          >
            Entrar
          </button>
        </Link>
      </form>
    </div>
  );
}

// Login.propTypes = {
//   send: PropTypes.func,
// }.isRequired;

export default Login;
