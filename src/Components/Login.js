import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

function Login() {
  const [logged, setLogged] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState(false);

  const updateEmail = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const updatePassword = ({ target }) => {
    const { value } = target;
    setPassword(value);
  };

  const authLogin = () => {
    window.localStorage.setItem('mealsToken', 1);
    window.localStorage.setItem('cocktailsToken', 1);
    window.localStorage.setItem('user', JSON.stringify({ email }));
    setLogged(true);
  };

  useEffect(() => {
    const regexEMAIL = /[\w.-]+@[\w-]+\.[\w-.]+/gi;
    const matchEmail = email.match(regexEMAIL);
    const six = 6;

    if (matchEmail && password.length > six) {
      setAuth(true);
    }
  }, [email, password]);

  if (logged) {
    return <Redirect to="/comidas" />;
  }

  return (
    <div>
      <label htmlFor="email">
        Email:
        <input
          onChange={ updateEmail }
          data-testid="email-input"
          id="email"
          type="text"
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          onChange={ updatePassword }
          data-testid="password-input"
          id="password"
          type="text"
        />
      </label>
      <button
        disabled={ !auth }
        data-testid="login-submit-btn"
        type="button"
        onClick={ authLogin }
      >
        Login
      </button>
    </div>
  );
}

export default Login;
