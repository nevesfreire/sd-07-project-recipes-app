/* eslint-disable no-case-declarations */
// Neste arquivo sera definido o Reducer (o que cada acao ira realizar):
// Exemplo:

// Importamos os tipos de acao da pagina e o estado inicial da aplicacao.
import { AuthTypes } from './types';
import initialState from '../initialState';

// Declaramos uma contante que ira recuperar os dados do estado que vamos utilizar.
const INITIAL_STATE = initialState.auth;

// Definimos a funcao reducer passando o estado com que vamos trabalhar e a action:
const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  // Cada 'case' traz o tipo da action, conforme definido e o seu retorno.
  case AuthTypes.SIGNIN:
    const signedUser = state.usersList.find(
      (user) => action.payload.email === user.email,
    );
    return { ...state, currentUser: signedUser, isLogged: true };

  // Cada 'case' traz o tipo da action, conforme definido e o seu retorno.
  case AuthTypes.SIGNUP:
    return { ...state, usersList: [...state.usersList, action.payload] };

  // Cada 'case' traz o tipo da action, conforme definido e o seu retorno.
  case AuthTypes.LOGOUT:
    return { ...state, isLogged: false, currentUser: {} };
  default:
    return state;
  }
};

export default authReducer;
