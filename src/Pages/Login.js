import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

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
    <div className="backLogImage">
      <Form className="login-form">
        <div>
          <Form.Group>
            <Form.Label htmlFor="email">
              Email
              <Form.Control
                data-testid="email-input"
                type="input"
                onChange={ ({ target }) => setEmail(target.value) }
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="senha">
              Senha
              <Form.Control
                placeholder="Password"
                data-testid="password-input"
                onChange={ ({ target }) => setPassword(target.value) }
              />
            </Form.Label>
          </Form.Group>
          <Link to="/comidas">
            <Button
              disabled={ !dataVerify() }
              onClick={ handleClick }
              type="submit"
              data-testid="login-submit-btn"
            >
              Entrar
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Login;
