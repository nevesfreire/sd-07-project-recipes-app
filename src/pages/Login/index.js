import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const isEmailValid = () => {
    const format = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(format)) {
      console.log('OI');
      return true;
    }
    return false;
  };

  const isPasswordValid = () => {
    const MIN_LENGTH = 7;
    if (password.length >= MIN_LENGTH) return true;
    return false;
  };
  const isInputsValid = () => {
    if (isEmailValid() && isPasswordValid()) {
      setDisabled(false);
    }
    setDisabled(true);
  };

  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          data-testid="email-input"
          value={ email }
          onChange={ ({ target: { value } }) => {
            setEmail(value);
            isInputsValid();
          } }
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          data-testid="password-input"
          value={ password }
          onChange={ ({ target: { value } }) => {
            setPassword(value);
            isInputsValid();
          } }
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        data-testid="login-submit-btn"
        disabled={ disabled }
      >
        Submit
      </Button>
    </Form>
  );
}

export default Login;
