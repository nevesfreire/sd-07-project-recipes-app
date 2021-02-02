import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);

  const verifyData = () => {
    const six = 6;
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(email) && password.length > six) setIsDisable(false);
    else setIsDisable(true);
  };

  useEffect(() => {
    verifyData();
  }, [email, password]);

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    props.history.push('/comidas');
  };

  return (
    <form>
      <input
        type="email"
        name="email"
        value={ email }
        placeholder="Digite seu Email"
        data-testid="email-input"
        onChange={ ({ target }) => setEmail(target.value) }
        autoCorrect="off"
      />
      <input
        type="password"
        name="password"
        value={ password }
        placeholder="Digite sua Senha"
        data-testid="password-input"
        onChange={ ({ target }) => setPassword(target.value) }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ isDisable }
        onClick={ handleClick }
      >
        Entrar
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Login;
