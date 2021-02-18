import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Login = (props) => {
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
    const limitSize = 6;
    if (password.length >= limitSize) {
      setCheckedPassword(false);
    }
  };

  const submit = () => {
    const { history } = props;
    const emilObject = { email };
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify(emilObject));
    history.push('/comidas');
  };

  return (
    <div>
      <input
        data-testid="email-input"
        type="text"
        name="email"
        value={ email }
        onChange={ handleChangeEmail }
      />
      <input
        data-testid="password-input"
        type="password"
        name="password"
        value={ password }
        onChange={ handleChangePassword }
      />
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ checkedPassword || !validatesEmail() }
        onClick={ submit }
      >
        Entrar
      </button>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
