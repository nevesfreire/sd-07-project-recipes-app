import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setLogin({
      ...login, [name]: value,
    });
  };

  const validateImputs = () => {
    const minimumPasswordLength = 6;
    const { email, password } = login;
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValidator.test(email) && password.length > minimumPasswordLength) {
      return false;
    }
    return true;
  };

  const saveLocalStorage = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const emailObj = {
      email: login.email,
    };
    localStorage.setItem('user', JSON.stringify(emailObj));
  };

  const history = useHistory();

  const handleClick = () => {
    saveLocalStorage();
    history.push('/comidas');
  };

  return (
    <div className="div-body-login">
      <h2>Login</h2>
      <label htmlFor="userEmail" className="label-email">
        <input
          className="input-email"
          id="userEmail"
          placeholder="Email"
          name="email"
          data-testid="email-input"
          type="text"
          onChange={ (event) => handleChange(event) }
        />
      </label>
      <label htmlFor="userPassword" className="label-password">
        <input
          className="input-password"
          id="userPassword"
          placeholder="Password"
          name="password"
          data-testid="password-input"
          type="password"
          onChange={ (event) => handleChange(event) }
        />

      </label>
      <br />

      <button
        className="button-login"
        disabled={ validateImputs() }
        type="button"
        onClick={ () => handleClick() }
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
