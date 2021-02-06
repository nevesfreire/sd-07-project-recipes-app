import React, { useContext } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../Context/RecipesContext';
import { setStorage } from '../../services/localStorage';
import './style.css';

function Login() {
  const { handleChange, btActive, login } = useContext(RecipesContext);
  const { password, email } = login;
  const numberCharacters = 6;
  const history = useHistory();

  const handleClick = () => {
    const emailObject = {
      email,
    };
    setStorage('user', emailObject);
    setStorage('mealsToken', 1);
    setStorage('cocktailsToken', 1);
    history.push('/comidas');
  };

  return (
    <div className="container">
      <div>
        <div className="title-left">
          Shellf Service
        </div>
        <div className="title-right">
          com Parrilla
        </div>
      </div>
      <div className="subtitle">
        O melhor sabor você encontra aqui !!!
      </div>
      <InputGroup className="mb-3" size="lg">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">📧</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="e-mail"
          type="email"
          onChange={ (event) => handleChange(event, 'email') }
        />
      </InputGroup>
      <InputGroup size="lg">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon2">🔑</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="senha"
          type="password"
          onChange={ (event) => handleChange(event, 'password') }
        />
      </InputGroup>
      <br />
      <Button
        variant="light"
        size="lg"
        disabled={ !btActive || password.length <= numberCharacters }
        onClick={ handleClick }
      >
        Entrar
      </Button>
    </div>
  );
}

export default Login;
