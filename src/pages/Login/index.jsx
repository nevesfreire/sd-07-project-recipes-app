import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const HandleChange = ({ target }) => {
    if (target.name === 'email') {
      return setEmail(target.value);
    }
    return setPassword(target.value);
  };

  const ValidateFields = () => {
    // eslint-disable-next-line
    const re = '^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$';
    const minLength = 5;
    if (re.test(email) && password.length > minLength) {
      return false;
    }
    return true;
  };

  const CheckLocalStorage = () => {
    localStorage.setItem('mealsToken');
    localStorage.setItem('cocktailsToken');
    // eslint-disable-next-line
    const user = { 'email': email };
    localStorage.setItem('user', user);
  };

  return (
    <form>
      <label htmlFor="email">
        Email:
        <input
          value={ email }
          onChange={ HandleChange }
          required
          name="email"
          type="email"
          data-testid="email-input"
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          value={ password }
          onChange={ HandleChange }
          required
          name="password"
          type="text"
          data-testid="password-input"
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ ValidateFields() }
        onSubmit={ () => {
          CheckLocalStorage();
          return <Redirect to="/comidas" />;
        } }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
