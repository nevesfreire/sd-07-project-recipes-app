import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import LoginComp from '../components/LoginComp';
import { useValideEmailAndPassword, useLocalStorage } from '../hooks';
import { SUBMIT_EMAIL } from '../reducers/userReducer';
import { CupNodesContext } from '../contexts';

const initialState = { email: '', password: '' };

export default function Login({ history: { push } }) {
  const { dispatchUser } = useContext(CupNodesContext);
  const [valid, verificationUser] = useValideEmailAndPassword();
  const [state, setState] = useState(initialState);
  const [, setEmail] = useLocalStorage('user');
  const [, setMealsToken] = useLocalStorage('mealsToken');
  const [, setCocktailsToken] = useLocalStorage('cocktailsToken');

  const changeState = ({ target: { type: key, value } }) => {
    setState({ ...state, [key]: value });
    verificationUser(state);
  };

  const submitUser = () => {
    setEmail(state.email);
    setMealsToken('1');
    setCocktailsToken('1');
    dispatchUser({ type: SUBMIT_EMAIL, payload: state.email });
    push('/comidas');
  };

  return (
    <LoginComp
      changeState={ changeState }
      submitUser={ submitUser }
      valid={ valid }
    />);
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
