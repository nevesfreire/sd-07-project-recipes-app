import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useValideEmailAndPassword, useLocalStorage } from '../hooks';
import { SUBMIT_EMAIL } from '../reducers';
import { CupNodesContext } from '../contexts';

const initialState = { email: '', password: '' };

export default function Login({ history: { push } }) {
  const { dispatchUser } = useContext(CupNodesContext);
  const [valid, verificationUser] = useValideEmailAndPassword();
  const [state, setState] = useState(initialState);
  const [, setUser] = useLocalStorage('user');
  const [, setSMealsToken] = useLocalStorage('mealsToken');
  const [, setCocktailsToken] = useLocalStorage('cocktailsToken');

  const changeState = ({ target: { type: key, value } }) => {
    setState({ ...state, [key]: value });
    verificationUser(state);
  };

  const action = { type: SUBMIT_EMAIL, payload: state.email };
  const submitUser = () => {
    setUser({ email: state.email });
    setSMealsToken(1);
    setCocktailsToken(1);
    dispatchUser(action);
    push('/comidas');
  };

  return (
    <div>
      <label htmlFor="email-input">
        Email:
        <input
          data-testid="email-input"
          type="email"
          onChange={ changeState }
        />
      </label>
      <label htmlFor="password-input">
        Senha:
        <input
          data-testid="password-input"
          type="password"
          onChange={ changeState }
        />
      </label>
      {
        valid
          ? (
            <button
              type="submit"
              data-testid="login-submit-btn"
              onClick={ submitUser }
            >
              Entrar
            </button>
          )
          : (
            <button
              type="submit"
              data-testid="login-submit-btn"
              disabled
            >
              Entrar
            </button>
          )
      }
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
