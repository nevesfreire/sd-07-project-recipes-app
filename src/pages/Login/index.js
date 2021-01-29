import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setStorage } from '../../services/localStorage';

function Login() {
  const initialState = {
    email: '',
    password: '',
  };
  const [button, setButton] = useState(true);
  const [form, setForm] = useState(initialState);

  function handleInputs(key, value) {
    setForm({
      ...form,
      [key]: value,
    });
  }

  useEffect(() => {
    function isValidEmail() {
      const validacaoByStackOf = /[\w.-]+@[\w-]+\.[\w-.]+/gi;
      return form.email.match(validacaoByStackOf);
    }
    function isValidPassword() {
      const passwordLength = 6;
      if (form.password.length > passwordLength) return true;
      return false;
    }
    if (isValidEmail() && isValidPassword()) {
      setButton(false);
    } else {
      setButton(true);
    }
  }, [form]);
  return (
    <div>
      <form>
        <input
          type="text"
          name="email"
          value={ form.email }
          placeholder="email"
          data-testid="email-input"
          onChange={ (e) => handleInputs(e.target.name, e.target.value) }
        />
        <input
          type="password"
          name="password"
          value={ form.password }
          placeholder="Senha"
          data-testid="password-input"
          onChange={ (e) => handleInputs(e.target.name, e.target.value) }
        />
        <Link to="/comidas">
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ button }
            onClick={ () => {
              setStorage('mealsToken', 1);
              setStorage('cocktailsToken', 1);
              setStorage('user', { email: form.email });
            } }
          >
            Entrar
          </button>
        </Link>
      </form>
    </div>
  );
}
export default Login;
