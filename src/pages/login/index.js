import React, { useContext } from 'react';
import RecipesContext from '../../Context/RecipesContext';

function Login() {
  const { handleChange, btActive, login } = useContext(RecipesContext);
  const { password } = login;
  const numberCharacters = 6;
  console.log(password);
  return (
    <div>
      <label htmlFor="email">
        Email:
        <br />
        <input
          type="email"
          data-testid="email-input"
          id="email"
          onChange={ (event) => handleChange(event, 'email') }
        />
      </label>
      <br />
      <label htmlFor="password">
        Pass:
        <br />
        <input
          type="password"
          data-testid="password-input"
          id="password"
          onChange={ (event) => handleChange(event, 'password') }
        />
      </label>
      <br />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !btActive || password.length <= numberCharacters }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
