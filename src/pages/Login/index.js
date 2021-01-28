import React, { useContext } from 'react';
import RecipesContext from '../../context/RecipesContext';

function Login() {
  const { handleInputs, disabled } = useContext(RecipesContext);
  console.log(useContext(RecipesContext));
  return (
    <div>
      <form>
        <input
          type="text"
          name="email"
          placeholder="email"
          data-testid="email-input"
          onChange={ handleInputs }
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          data-testid="password-input"
          onChange={ handleInputs }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ disabled }
          // onClick={ this. }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
export default Login;
