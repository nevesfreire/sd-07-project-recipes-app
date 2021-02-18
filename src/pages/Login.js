import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target }) => {
    const { name, value } = target;

    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const login = () => true;

  return (
    <div>
      <input
        data-testid="email-input"
        type="text"
        name="email"
        value={ email }
        onChange={ handleChange }
      />
      <input
        data-testid="password-input"
        type="password"
        name="password"
        value={ password }
        onChange={ handleChange }
      />
      <button
        data-testid="login-submit-btn"
        type="button"
        onClick={ login }
      >
        Entrar
      </button>
    </div>
  );
};

export default Login;
