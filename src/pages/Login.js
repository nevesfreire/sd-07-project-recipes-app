import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../components';
import { useValideEmailAndPassword, useLocalStorage, useVip } from '../hooks';
import { SUBMIT_EMAIL } from '../reducers';
import { CupNodesContext } from '../contexts';
import './css/login.css';
import { imagemLogo } from '../images';

const initialState = { email: '', password: '' };

export default function Login({ history: { push } }) {
  const { dispatchUser } = useContext(CupNodesContext);
  const [valid, verificationUser] = useValideEmailAndPassword();
  const [vip, verificationVip] = useVip(false);
  const [state, setState] = useState(initialState);
  const [, setUser] = useLocalStorage('user');
  const [, setSMealsToken] = useLocalStorage('mealsToken');
  const [, setCocktailsToken] = useLocalStorage('cocktailsToken');

  const changeState = ({ target: { type: key, value } }) => {
    setState({ ...state, [key]: value });
    verificationUser(state);
    verificationVip(value);
  };

  const action = { type: SUBMIT_EMAIL, payload: state.email };
  const submitUser = () => {
    setUser({ email: state.email });
    setSMealsToken(1);
    setCocktailsToken(1);
    dispatchUser(action);
    push(vip ? `/vip/${state.email}` : '/comidas');
  };

  return (
    <div className="container">
      <div className="loginBox">
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
          vip
            ? (
              <Button
                type="submit"
                testid="login-submit-btn"
                onClick={ submitUser }
                classBootstrap="warning"
                text="Entrar"
                func={ submitUser }
              />
            )
            : (
              <Button
                type="submit"
                testid="login-submit-btn"
                onClick={ submitUser }
                text="Entrar"
                func={ submitUser }
                disabled={ !valid }
              />
            )
        }
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
