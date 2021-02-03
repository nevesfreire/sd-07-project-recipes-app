import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button } from '@material-ui/core';
import context from '../contextAPI/context';
import '../css/login.css';


  const inputText = (onChange) => (
    <div className="input-text">
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

  const ButtonLogin = (onClick) => {
    const { state } = useContext(context);
    const { isDisabled } = state;
    return (
    <div className="input-button">
      <Button
        data-testid="login-submit-btn"
        variant="contained"
        collor="primary"
        disabled={ isDisabled }
        onClick={ (e) => onClick(e) }
      >
        Logar
      </Button>
    </div>
    )
  };
export default function Render() {
  const { login, setLogin} = useContext(context);
  const history = useHistory();
  
  const loginChanges = ({ target: { name, value } }) => {
    setLogin({ ...login, [name]: value });
  };

  const callRoute = () => history.push("/mainrecipes");


  return (
    <div>
      {inputText(loginChanges)}
      {inputPasswd(loginChanges)}
      {ButtonLogin(callRoute)}
    </div>
  );
}

/* O input de email deve possuir o atributo data-testid="email-input";
O input de senha deve possuir o atributo data-testid="password-input";
O botão "Entrar" deve possuir o atributo data-testid="login-submit-btn". */
