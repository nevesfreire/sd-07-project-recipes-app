import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

function LoginForm() {
  const [login, setLogin] = useState({ email: '', senha: '' });
  const history = useHistory();

  const validLogin = () => {
    const entra = document.getElementById('btn-entra');
    const minimo = 6;
    const regEmail = /.+@.+\.[A-Za-z]+$/;
    if (regEmail.test(login.email) && login.senha.length > minimo) {
      entra.removeAttribute('disabled');
    } else {
      entra.setAttribute('disabled', '');
    }
  };
  useEffect(validLogin, [validLogin, login]);

  const handlechange = (name, value) => setLogin({ ...login, [name]: value });

  const handleClick = () => {
    history.push('/comidas');
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: login.email }));
  };

  return (
    <div>
      <form>
        <label htmlFor="email">
          <input
            data-testid="email-input"
            name="email"
            type="email"
            value={ login.email }
            onChange={ ({ target }) => handlechange(target.name, target.value) }
          />
        </label>
        <label htmlFor="senha">
          <input
            data-testid="password-input"
            name="senha"
            type="password"
            value={ login.senha }
            onChange={ ({ target }) => handlechange(target.name, target.value) }
          />
        </label>
        <button
          data-testid="login-submit-btn"
          type="button"
          id="btn-entra"
          onClick={ handleClick }
        >
          Entrar
        </button>
      </form>
      <Link to="/">Esqueceu a senha?</Link>
    </div>
  );
}

export default LoginForm;
