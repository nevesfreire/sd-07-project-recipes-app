import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  function enableButton() {
    const regexForEmail = /\S+@\S+\.\S+/;
    const length = 6;
    const passwordIsValid = password.length >= length;
    const emailIsValid = regexForEmail.test(email);
    if (passwordIsValid && emailIsValid === true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  function handleChangeEmail({ target }) {
    const { value } = target;
    setEmail(value);
    enableButton();
  }

  function handleChangePassword({ target }) {
    const { value } = target;
    setPassword(value);
    enableButton();
  }

  function handleSubmit() {
    const userEmail = { email };
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify(userEmail));
    history.push('./comidas');
  }

  return (
    <div>
      <form>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            data-testid="email-input"
            type="email"
            value={ email }
            onChange={ handleChangeEmail }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            id="password"
            data-testid="password-input"
            type="password"
            value={ password }
            onChange={ handleChangePassword }
          />
        </label>
        <button
          data-testid="login-submit-btn"
          type="submit"
          disabled={ disabled }
          onClick={ handleSubmit }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
