import { Button, Form } from 'react-bootstrap';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import foodIcon from '../images/spicy-food-svgrepo-com.svg';
import '../styles/Login.css';

function Login() {
  const {
    setEmail,
    setSenha,
    email,
    senha,
  } = useContext(RecipesContext);

  const history = useHistory();

  const handleEnter = () => {
    localStorage.clear();
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  };

  const isDisabled = () => {
    const regexEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const seis = 6;
    if (regexEmail.test(email) && senha.length > seis) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <h2 className="title">Recipes App</h2>
      <Form className="form">
      <img src={foodIcon} className="icon"/>
        <Form.Group controlId="formBasicEmail">

          <Form.Control
            type="email"
            data-testid="email-input"
            placeholder="Email"
            name="email"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="password"
            data-testid="password-input"
            placeholder="Senha"
            name="senha"
            onChange={ (e) => setSenha(e.target.value) }
          />
        </Form.Group>

        <Button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisabled() }
          onClick={ handleEnter }
          variant="success"
          className="button"
        >
          Entrar
        </Button>

      </Form>
    </div>
  );
}

export default Login;
