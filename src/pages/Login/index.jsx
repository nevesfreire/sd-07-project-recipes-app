import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import './Login.css';

export default function Login() {
  const {
    login, setLogin, disabled, setDisabled,
  } = useContext(RecipesContext);

  const validateEmailAndPassword = () => {
    const emailValidation = (/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i)
      .test(login.email);
    const minPass = 5;

    const validation = emailValidation && login.password.length > minPass
      ? setDisabled(false)
      : setDisabled(true);
    return validation;
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setLogin({ ...login, [name]: value });
    validateEmailAndPassword();
  };

  const handleSubmit = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);

    const user = { email: login.email };

    localStorage.setItem('user', JSON.stringify(user));

    setLogin({ ...login, redirect: true });
  };

  return (
    <div className="login-container">

      {
        login.redirect
          ? <Redirect to="/comidas" />
          : null
      }

      <label htmlFor="email">
        E-mail:
        <input
          type="email"
          name="email"
          data-testid="email-input"
          onChange={ (e) => handleChange(e) }
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          type="password"
          name="password"
          data-testid="password-input"
          onChange={ (e) => handleChange(e) }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ disabled }
        onClick={ () => handleSubmit() }
      >
        Entrar
      </button>
    </div>
  );
}
