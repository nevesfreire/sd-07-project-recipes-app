import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    loginEmail: '',
    password: '',
  });
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const verifyInput = () => {
    const { loginEmail, password } = loginInfo;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail);
    const SIX = 6;
    const validPassword = password.length >= SIX;

    return validEmail && validPassword;
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const handleClick = () => {
    const item = { email: loginInfo.loginEmail };
    localStorage.setItem('user', JSON.stringify(item));
    setShouldRedirect(true);
  };

  if (shouldRedirect) {
    return <Redirect to="/comidas" />;
  }

  return (
    <div>
      <form>
        <input
          type="email"
          name="loginEmail"
          data-testid="email-input"
          placeholder="alguem@alguem.com"
          onChange={ handleChange }
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          required
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="password-input"
          disabled={ !verifyInput() }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
