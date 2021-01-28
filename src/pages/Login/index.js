import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { initialize, saveItem } from '../../services/localStorage';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const isEmailValid = () => {
      const format = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (email.match(format)) {
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
        return setDisabled(false);
      }
      return setDisabled(true);
    };

    isInputsValid();
  }, [email, password]);

  const handleSubmit = () => {
    initialize();
    saveItem('user', { email });
    history.push('/comidas');
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
          onChange={ ({ target: { value } }) => setEmail(value) }
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          data-testid="password-input"
          value={ password }
          onChange={ ({ target: { value } }) => setPassword(value) }
        />
      </Form.Group>
      <Button
        variant="primary"
        type="button"
        data-testid="login-submit-btn"
        disabled={ disabled }
        onClick={ handleSubmit }
      >
        Submit
      </Button>
    </Form>
  );
}

// Login.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func.isRequired,
//   }).isRequired,
// };

export default Login;
