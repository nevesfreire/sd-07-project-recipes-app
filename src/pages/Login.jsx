import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from '../context/GlobalContext';

export default function Login(props) {
  const { history } = props;
  const context = useContext(GlobalContext);
  const {
    email,
    password,
    setEmail,
    validEmail,
    validPassword,
    statusEmail,
    statusPassword,
  } = context;

  function validateEmail(value) {
    const isValid = value.match(/^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/);
    setEmail(value);
    if (isValid) {
      validEmail();
    }
  }

  function validatePassword(value) {
    const six = 6;
    if (value.length > six) validPassword();
  }

  function loadcocktailsToken() {
    const cocktailsToken = 1;
    if (Storage) {
      const value = cocktailsToken;
      localStorage.setItem('cocktailsToken', JSON.stringify(value));
    }
  }

  function loadmealsToken() {
    const mealsToken = 1;
    if (Storage) {
      const value = mealsToken;
      localStorage.setItem('mealsToken', JSON.stringify(value));
    }
  }

  function loadUserToStorage(payload) {
    const user = {
      email: payload,
    };
    if (Storage) {
      const value = user;
      localStorage.setItem('user', JSON.stringify(value));
    }
  }

  function handleToLocalStorage() {
    loadmealsToken();
    loadcocktailsToken();
    loadUserToStorage(email);
  }

  function handleChange(event) {
    event.preventDefault();
    handleToLocalStorage();
  }

  return (
    <div>
      <form className="form">
        <input
          required
          id="email"
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
          value={ email }
          data-testid="email-input"
          onChange={ (event) => validateEmail(event.target.value) }
        />
        <input
          required
          id="password"
          type="password"
          placeholder="Digite sua senha"
          value={ password }
          data-testid="password-input"
          onChange={ (event) => validatePassword(event.target.value) }
        />
        <button
          id="submit-btn"
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !statusEmail || !statusPassword }
          onClick={ (event) => {
            handleChange(event);
            history.push('/comidas');
          } }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.objectOf.isRequired,
};
