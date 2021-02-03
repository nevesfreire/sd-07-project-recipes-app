import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button } from '@material-ui/core';
import context from '../contextAPI/context';
import '../css/login.css';

const inputText = (onChange) => (
  <div className="input-email">
    <Input
      data-testid="email-input"
      type="email"
      name="user"
      placeholder="email@email.com"
      onChange={ (e) => onChange(e) }
    />
  </div>
);

const inputPasswd = (onChange) => (
  <div className="input-senha">
    <Input
      data-testid="password-input"
      type="password"
      name="passwd"
      placeholder="sua senha aqui"
      onChange={ (e) => onChange(e) }
    />
  </div>
);

const buttonLogin = (onClick, enable) => (
  <div className="input-button">
    <Button
      data-testid="login-submit-btn"
      variant="contained"
      color="primary"
      disabled={ enable }
      onClick={ (e) => onClick(e) }
    >
      Entrar
    </Button>
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

  const callRoute = () => {
    setState((s) => ({
      ...s,
      profileButton: true,
      title: 'Comidas',
      searchButton: true,
      toggleSearch: false,
    }));
    return history.push('/comidas');
  };

  return (
    <div className="input-login-controller">
      {inputText(loginChanges)}
      {inputPasswd(loginChanges)}
      {buttonLogin(callRoute, isDisabled)}
    </div>
  );
}
