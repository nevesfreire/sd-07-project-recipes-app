import React from 'react';
// import RecipeContext from '../Context/Context';

function Login() {
//   const {} = useContext(RecipeContext);
  return (
    <div>
      <label htmlFor="email">
        Email
        <input
          data-testid="email-input"
          type="input"
          onChange={ () => {} }
        />
      </label>
      <label htmlFor="senha">
        SENHA
        <input
          placeholder="Password"
          data-testid="password-input"
          onChange={ () => {} }
        />
      </label>
      <button type="submit" data-testid="login-submit-btn">Entrar</button>
    </div>);
}

export default Login;
