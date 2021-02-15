import React from 'react';
import { useHistory } from 'react-router-dom';
import validate from './LoginFormValidationRules';
import { useForm, useLocalStorage } from '../../hooks';
import { Container, StyledForm, StyledButton } from './styles';

const Login = () => {
  const history = useHistory();
  const [, setUser] = useLocalStorage('user', {});
  const [, setMealsToken] = useLocalStorage('mealsToken', 1);
  const [, setCocktailsToken] = useLocalStorage('cocktailsToken', 1);
  const {
    values,
    isAllValid,
    handleChange,
  } = useForm({ email: '', password: '' }, validate);

  const handleSubmit = () => {
    setUser({ email: values.email });
    setMealsToken(1);
    setCocktailsToken(1);
    history.push('/comidas');
  };

  return (
    <Container>
      <StyledForm>
        <StyledForm.Group controlId="formBasicEmail">
          {/* <StyledForm.Label>E-mail:</StyledForm.Label> */}
          <StyledForm.Control
            type="text"
            placeholder="Informe um Email"
            data-testid="email-input"
            name="email"
            onChange={ handleChange }
            value={ values.email || '' }
          />
        </StyledForm.Group>

        <StyledForm.Group controlId="formBasicPassword">
          {/* <StyledForm.Label>Senha:</StyledForm.Label> */}
          <StyledForm.Control
            type="password"
            placeholder="Informe uma Senha"
            data-testid="password-input"
            name="password"
            onChange={ handleChange }
            value={ values.password || '' }
          />
        </StyledForm.Group>
        <StyledButton
          variant="primary"
          type="button"
          data-testid="login-submit-btn"
          disabled={ !isAllValid }
          onClick={ handleSubmit }
        >
          Entrar
        </StyledButton>
      </StyledForm>
    </Container>
  );
};

export default Login;
