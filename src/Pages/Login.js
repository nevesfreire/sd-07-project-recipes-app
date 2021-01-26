import React, { useState } from 'react';
// import RecipeContext from '../Context/Context';

function Login() {
//   const {} = useContext(RecipeContext);
const [email, setEmail] = useState();
const [password, setPassword] = useState(0);

function dataVerify() {
  const minLength = 6;
  if (/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i 
    .test(email) && password.length > minLength) {
    return true;
  }
  return false;
}

function handleClick() {
  setEmail('');
  setPassword('')
}

  return (
    <div>
      <label htmlFor="email">
        Email
        <input
          data-testid="email-input"
          type="input"
          onChange={ ({target}) => setEmail(target.value)}
        />
      </label>
      <label htmlFor="senha">
        Senha
        <input
          placeholder="Password"
          data-testid="password-input"
          onChange={ ({target}) => setPassword(target.value)}
        />
      </label>
      <button disabled={!dataVerify()} onClick={ handleClick }type="submit" data-testid="login-submit-btn">Entrar</button>
    </div>);
}

export default Login;
