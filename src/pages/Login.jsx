import React, { useContext, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';

export default function Login(props) {
  const {history} = props;
  const context = useContext(GlobalContext);
  const {
    email,
    password,
    setEmail,
    statusEmail,
    statusPassword,
    validEmail,
    validPassword,
  } = context;

  function validateEmail(value) {
    const isValid = value.match(/^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/);
    console.log(isValid)
    setEmail(value);
    // if (isValid !== null) {
    //   validEmail();
    // }
  }

  function validatePassword(value) {
    if (value.lenght > 6)
    validPassword();
  }

  function loadcocktailsToken() {
    const cocktailsToken = 1;
    if (Storage) {
      const getcocktailsToken = JSON.parse(
        localStorage.getItem("cocktailsToken")
      );
      const value = getcocktailsToken === null ? [] : getcocktailsToken;
      value.push(cocktailsToken);
      localStorage.setItem("cocktailsToken", JSON.stringify(value));
    }
  }

  function loadmealsToken() {
    const mealsToken = 1;
    if (Storage) {
      const getMealsToken = JSON.parse(localStorage.getItem("mealsToken"));
      const value = getMealsToken === null ? [] : getMealsToken;
      value.push(mealsToken);
      localStorage.setItem("mealsToken", JSON.stringify(value));
    }
  }

  function loadUserToStorage(email) {
    const user = {
      email,
    };
    if (Storage) {
      const getUserSaved = JSON.parse(localStorage.getItem("user"));
      const value = getUserSaved === null ? [] : getUserSaved;
      value.push(user);
      localStorage.setItem("user", JSON.stringify(value));
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

  return(
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
			    onChange={(event) => validateEmail(event.target.value)}
			  />
			  <input
			    required
			    id="password"
			    type="password"
			    placeholder="Digite sua senha"
			    value={ password }
			    data-testid="password-input"
			    onChange={(event) => validatePassword(event.target.value)}
			  />
			  <button
			    id="submit-btn"
			    type="submit"
			    data-testid="login-submit-btn"
			    disabled={ !validateEmail || !validatePassword }
			    onClick={ (event) => { handleChange(event); history.push('/comidas') } }
			  > Entrar </button>
        </form>
    </div>
	)
}
