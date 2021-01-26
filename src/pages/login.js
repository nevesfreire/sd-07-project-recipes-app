import React, { useState } from 'react';

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

  const handleClick = () => {
    saveLocalStorage();
  };

  return (
    <div>
      <label htmlFor="userEmail">
        <input
          id="userEmail"
          placeholder="Email"
          name="email"
          data-testid="email-input"
          type="text"
          onChange={ (event) => handleChange(event) }
        />
      </label>
      <label htmlFor="userPassword">
        <input
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
