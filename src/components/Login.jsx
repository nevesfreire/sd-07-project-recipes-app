import React, { useContext } from 'react';
import CoffeAndCodeContext from '../context/CoffeeAndCodeContext';

function Login() {

  const {
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(CoffeAndCodeContext);

  const isEmail = (event) => {

  }

  const isPassword = (event) => {

  }

  return (
    <div>
      <header>
        <h1>Coffee and Code</h1>
      </header>
      <section>
        <input
          type="email"
          name="email"
          onChange={ isEmail }
          data-testid="email-input"
          placeholder="example@email.com"
        />
        <input
          type="password"
          name="password"
          onChange={ isPassword }
          data-testid="password-input"
        />
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ !email || !password }
        >
          Enter
        </button>
      </section>
    </div>
  );
}

export default Login;
