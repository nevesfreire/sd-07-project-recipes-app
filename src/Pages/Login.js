import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';


function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('0');

  function dataVerify() {
    const minLength = 6;
    if (/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i
      .test(email) && password.length > minLength) {
      return true;
    }
    return false;
  }

  function handleClick() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  }

  return (
  <div className="container alinhamento-central">
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
          <Form.Control
            data-testid="email-input"
            type="input"
            onChange={ ({ target }) => setEmail(target.value) } />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
            <Form.Control
              placeholder="Password"
              data-testid="password-input"
              onChange={ ({ target }) => setPassword(target.value) } />
        </Form.Group>
        <div className="divButton">
        <Link to="/comidas">
          <Button
            className="item"
            variant="success"
            disabled={ !dataVerify() }
            onClick={ handleClick }
            type="submit"
            data-testid="login-submit-btn">
            Entrar
          </Button>
        </Link>
        </div>
       
    </Form>
  </div>

  )
}

export default Login;
