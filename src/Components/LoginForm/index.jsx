import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import RecipeContext from '../../Context/RecipeContext';
import { verifyLogin, saveTokens } from '../../helper/loginHelper';

const LoginForm = () => {
  const [userEmail, setEmail] = useState('');
  const [userPass, setPass] = useState('');
  const [statusButton, setStatusButton] = useState(true);
  const { dispatch } = useContext(RecipeContext);
  const history = useHistory();

  useEffect(() => {
    if (verifyLogin(userEmail, userPass)) {
      setStatusButton(false);
    } else {
      setStatusButton(true);
    }
  }, [userEmail, userPass]);

  return (
    <form action="">
      <input
        type="email"
        name="userEmail"
        value={ userEmail }
        data-testid="email-input"
        onChange={ ({ target }) => setEmail(target.value) }
      />

      <input
        type="password"
        name="userPass"
        value={ userPass }
        data-testid="password-input"
        onChange={ ({ target }) => setPass(target.value) }
      />

      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ statusButton }
        onClick={ () => {
          saveTokens();
          dispatch({ type: 'SET_USER', userEmail });
          history.push('/comidas');
        } }
      >
        Entrar
      </button>
    </form>
  );
};

export default LoginForm;
