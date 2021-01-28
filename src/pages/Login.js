import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function Login() {
  const {
    setEmail,
    setSenha,
    handleEntrarButton,
    email,
    senha,
  } = useContext(RecipesContext);

  const isDisabled = () => {
    const regexEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const seis = 6;
    if (regexEmail.test(email) && senha.length > seis) {
      return false;
    }
    return true;
  };

  return (
    <form>
      <input
        type="email"
        data-testid="email-input"
        placeholder="Email"
        name="email"
        onChange={ (e) => setEmail(e.target.value) }
      />

      <input
        type="password"
        data-testid="password-input"
        placeholder="Senha"
        name="senha"
        onChange={ (e) => setSenha(e.target.value) }
      />

      <Link to='/comidas'>
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisabled() }
          onClick={ handleEntrarButton }
        >
          Entrar
        </button>
      </Link>

    </form>
  );
}

export default Login;
