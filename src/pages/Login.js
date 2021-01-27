import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function Login() {
  const { login, setLogin } = useContext(RecipesContext);
  const { email, password } = login;

  const verifyPass = () => {
    const SEVEN = 7;
    const validatePassword = password.length >= SEVEN;
    return validatePassword;
  };

  const verify = () => {
    const regex = /\S+@\S+\.\S+/;
    const validate = regex.test(email);
    return validate;
  };

  const verifyLogin = () => {
    const verifyEmail = verify();
    const verifyPassword = verifyPass();

    if (verifyEmail && verifyPassword) {
      return false;
    }
    return true;
  };

  const submitLogin = () => {
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
  };

  return (
    <div>
      <form>
        <input
          name="email"
          type="email"
          data-testid="email-input"
          placeholder="Digite seu e-mail"
          onChange={ (e) => setLogin({ ...login, email: e.target.value }) }
        />
        <input
          name="password"
          type="password"
          data-testid="password-input"
          placeholder="Digite sua senha"
          onChange={ (e) => setLogin({ ...login, password: e.target.value }) }
        />
        <Link to="/comidas">
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ verifyLogin() }
            onClick={ submitLogin }
          >
            Logar
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
