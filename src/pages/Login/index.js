import React from 'react';
import { useHistory } from 'react-router-dom';
import validate from './LoginFormValidationRules';
import { useForm, useLocalStorage } from '../../hooks';

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
    <div>
      <form>
        <input
          data-testid="email-input"
          name="email"
          onChange={ handleChange }
          value={ values.email || '' }
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          onChange={ handleChange }
          value={ values.password || '' }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !isAllValid }
          onClick={ handleSubmit }
        >
          Enter
        </button>
      </form>
    </div>
  );
};

export default Login;
