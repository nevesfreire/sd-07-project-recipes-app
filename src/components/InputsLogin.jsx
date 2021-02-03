import React, { useContext } from 'react';
import { Input, Button } from '@material-ui/core';
import context from '../contextAPI/context';
import stateChanges from '../helpers/useChanges';
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
export default function Render() {
  // const { state, setState } = useContext(context);
  
  // const onChange = stateChanges()
  // const stateChange = ({ target: { name, value } }) => {
  //   setState({ ...state, [name]: value });
  // };

  return (
    <div>
      {inputText(stateChanges())}
      {inputPasswd(stateChanges())}
      {buttonLogin()}
    </div>
  );
}

/* O input de email deve possuir o atributo data-testid="email-input";
O input de senha deve possuir o atributo data-testid="password-input";
O botão "Entrar" deve possuir o atributo data-testid="login-submit-btn". */
