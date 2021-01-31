import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from '../context/GlobalContext';
import { LoginStyle } from './style';
import Logo from '../components/Logo';

const {
  LoginContainer,
  LogoContainer,
  Form,
  Input,
  Btn,
  PassContainer,
} = LoginStyle;

export default function Login(props) {
  const { history } = props;
  const context = useContext(GlobalContext);
  const {
    email,
    password,
    setEmail,
    setPassword,
  } = context;

  const infoVerifier = () => {
    const minimumPasswordLength = 6;
    const validateEmailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    const testEmail = validateEmailRegex.test(email);
    const testPassword = password.length > minimumPasswordLength;
    if (testEmail && testPassword) {
      return false;
    }
    return true;
  };

  function loadcocktailsToken() {
    const cocktailsToken = 1;
    if (Storage) {
      const value = cocktailsToken;
      localStorage.setItem('cocktailsToken', JSON.stringify(value));
    }
  }

  function loadmealsToken() {
    const mealsToken = 1;
    if (Storage) {
      const value = mealsToken;
      localStorage.setItem('mealsToken', JSON.stringify(value));
    }
  }

  function loadUserToStorage(payload) {
    const user = {
      email: payload,
    };
    if (Storage) {
      const value = user;
      localStorage.setItem('user', JSON.stringify(value));
    }
  }

  function handleToLocalStorage() {
    loadmealsToken();
    loadcocktailsToken();
    loadUserToStorage(email);
  }

  function handleChange(event) {
    event.preventDefault();
    handleToLocalStorage();
  }

  return (
    <LoginContainer>
      {/* <LogoContainer>
        <Logo />
      </LogoContainer> */}
      <Form>
        <Input
          required
          id="email"
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
          value={ email }
          data-testid="email-input"
          onChange={ (event) => setEmail(event.target.value) }
        />
        <PassContainer>
          <Input
            required
            id="password"
            type="password"
            placeholder="Digite sua senha"
            value={ password }
            data-testid="password-input"
            onChange={ (event) => setPassword(event.target.value) }
          />
          <Btn
            id="submit-btn"
            type="submit"
            data-testid="login-submit-btn"
            disabled={ infoVerifier() }
            onClick={ (event) => {
              handleChange(event);
              history.push('/comidas');
            } }
          >
            Entrar
          </Btn>
        </PassContainer>
      </Form>
    </LoginContainer>
  );
}

Login.propTypes = {
  history: PropTypes.objectOf.isRequired,
};
