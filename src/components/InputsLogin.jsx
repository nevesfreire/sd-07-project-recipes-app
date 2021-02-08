import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
// import { Input, Button } from '@material-ui/core';
// import { fetchApi, allFood } from '../services/fetchApi';
import context from '../contextAPI/context';
import '../css/login.css';

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
  const { login, setLogin } = useContext(context);
  const history = useHistory();
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
    return history.push('/comidas');
  };

  return (
    <div className="input-login">
      {inputText(loginChanges, login)}
      {inputPasswd(loginChanges, login)}
      {buttonLogin(callRoute, isDisabled)}
    </div>
  );
}
