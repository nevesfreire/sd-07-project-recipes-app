import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../Context/RecipesContext';
import { setStorage } from '../../services/localStorage';

function Login() {
  const { handleChange, btActive, login } = useContext(RecipesContext);
  const { password, email } = login;
  const numberCharacters = 6;
  const history = useHistory();

  const handleClick = () => {
    const emailObject = {
      email,
    };
    setStorage('user', emailObject);
    setStorage('mealsToken', 1);
    setStorage('cocktailsToken', 1);
    history.push('/comidas');
  };

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
        onClick={ handleClick }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
