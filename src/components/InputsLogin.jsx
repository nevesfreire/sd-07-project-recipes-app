import React, { useContext } from 'react';
// import { Input, Button } from '@material-ui/core';
// import { fetchApi, allFood } from '../services/fetchApi';
import context from '../contextAPI/context';
import '../css/login.css';
import useRedirect from '../hooks/useRedirect';

const inputText = (onChange, login) => (
  <div className="input-email">
    <input
      data-testid="email-input"
      type="email"
      name="user"
      value={ login.user }
      placeholder="email@email.com"
      onChange={ (e) => onChange(e) }
    />
  </div>
);

const inputPasswd = (onChange, login) => (
  <div className="input-senha">
    <input
      data-testid="password-input"
      type="password"
      name="passwd"
      value={ login.passwd }
      placeholder="sua senha aqui"
      onChange={ (e) => onChange(e) }
    />
  </div>
);

const buttonLogin = (onClick, enable) => (
  <div className="input-button">
    <button
      data-testid="login-submit-btn"
      type="button"
      variant="contained"
      color="primary"
      disabled={ enable }
      onClick={ (e) => onClick(e) }
    >
      Entrar
    </button>
  </div>
);

export default function InputLogin() {
  const PATH = '/comidas';
  const [setPath] = useRedirect();
  const { login, setLogin } = useContext(context);
  const { state, setState } = useContext(context);
  const { isDisabled } = state;

  const loginChanges = ({ target: { name, value } }) => {
    setLogin({ ...login, [name]: value });
  };

  const callRoute = async () => {
    setState((s) => ({
      ...s,
      profileButton: true,
      title: 'Comidas',
      searchButton: true,
      toggleSearch: false,
    }));
    localStorage.setItem('user', JSON.stringify({ email: state.user }));
    return setPath(PATH);
  };

  return (
    <div className="input-login">
      {inputText(loginChanges, login)}
      {inputPasswd(loginChanges, login)}
      {buttonLogin(callRoute, isDisabled)}
    </div>
  );
}
