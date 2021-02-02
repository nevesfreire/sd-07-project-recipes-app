import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkedPassword, setCheckedPassword] = useState(true);

  const validatesEmail = () => {
    const emailRegex = /[\w.-]+@[\w-]+\.[\w-.]+/gi;
    return emailRegex.test(email);
  };

  const handleChangeEmail = ({ target: { value } }) => {
    setEmail(value);
  };

  const handleChangePassword = ({ target: { value } }) => {
    setPassword(value);
    console.log(password.length);
    const limitSize = 6;
    if (password.length >= limitSize) setCheckedPassword(false);
  };

  const submit = () => {
    const { history } = props;

    const emilObject = { email };
    console.log(emilObject);
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify(emilObject));
    history.push('/comidas');
  };

  return (
    <div id="form-container">
      <div className="panel" id="form-box">
        <form action="login.php" method="post">
          <h1 className="text-center">Login</h1>
          <div className="form-group input-group">
            <span className="input-group-text" id="basic-addon1">@</span>
            <input
              type="text"
              name="email"
              className="form-control"
              value={ email }
              data-testid="email-input"
              placeholder="user@trybe.com"
              onChange={ (e) => handleChangeEmail(e) }
            />
          </div>

          <div className="form-group input-group">
            <Form.Control
              type="password"
              name={ password }
              data-testid="password-input"
              placeholder="Password"
              onChange={ (e) => handleChangePassword(e) }
            />
          </div>

          <div className="form-group">
            <Button
              variant="success"
              size="lg"
              block
              type="submit"
              data-testid="login-submit-btn"
              disabled={ checkedPassword || !validatesEmail() }
              onClick={ submit }
            >
              Entrar
            </Button>
          </div>
          <div className="form-group">
            Não é registrado?
            <a href="cadastro.html">Crie uma contra</a>
          </div>
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
