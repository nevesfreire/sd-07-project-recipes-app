import React, { useContext } from 'react';
import { Input, Button } from '@material-ui/core';
import context from '../contextAPI/context';
import UseChange from '../helpers/useChanges';
import '../css/login.css';

export default function Render() {
  const { state, setState } = useContext(context);

  // const HandleStateChange = ({ target: { name, value } }) => {
  //   // const { state, setState } = useContext(context);
  //   setState({ ...state, [name]: value });
  // };

  const inputText = () => (
    <div className="input-text">
      <Input
        data-testid="email-input"
        type="email"
        name="user"
        placeholder="email@email.com"
        onChange={ (e) => UseChange(e) }
      />
    </div>
  );

  const inputPasswd = () => (
    <div className="input-senha">
      <Input
        data-testid="password-input"
        type="password"
        name="passwd"
        placeholder="sua senha aqui"
        onChange={ (e) => UseChange(e) }
      />
    </div>
  );

  const buttonLogin = () => (
    <div className="input-button">
      <Button
        data-testid="login-submit-btn"
        variant="contained"
        collor="primary"
        // disable={ xablau }
        // onClick={ }
      >
        Logar
      </Button>
    </div>
  );

  return (
    <div>
      {inputText()}
      {inputPasswd()}
      {buttonLogin()}
    </div>
  );
}

/* O input de email deve possuir o atributo data-testid="email-input";
O input de senha deve possuir o atributo data-testid="password-input";
O botão "Entrar" deve possuir o atributo data-testid="login-submit-btn". */
