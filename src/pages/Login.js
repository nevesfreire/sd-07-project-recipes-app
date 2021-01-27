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
  const [a, setStorage] = useLocalStorage(['user', 'mealsToken', 'cocktailsToken']);

  const changeState = ({ target: { type: key, value } }) => {
    setState({ ...state, [key]: value });
    verificationUser(state);
  };

  const newLocalStorage = {
    user: { email: state.email },
    mealsToken: 1,
    cocktailsToken: 1,
  };
  const action = { type: SUBMIT_EMAIL, payload: state.email };
  const submitUser = () => {
    setStorage(newLocalStorage);
    dispatchUser(action);
    push('/comidas');
    console.log(a);
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
