<<<<<<< HEAD
// Neste arquivo sera definido o Reducer (o que cada acao ira realizar):
// Exemplo:

// Importamos os tipos de acao da pagina e o estado inicial da aplicacao.
import { AuthTypes } from './types';
import initialState from '../initialState';
// Declaramos uma contante que ira recuperar os dados do estado que vamos utilizar.
const INITIAL_STATE = initialState.login;
// Definimos a funcao reducer passando o estado com que vamos trabalhar e a action:
const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  // Cada 'case' traz o tipo da action, conforme definido e o seu retorno.
  case AuthTypes.SIGNIN: {
    const signedUser = state.usersList.find(
      (user) => action.payload.email === user.email,
    );
    return { ...state, currentUser: signedUser, isLogged: true };
  }
  // Cada 'case' traz o tipo da action, conforme definido e o seu retorno.
  case AuthTypes.SIGNUP:
    return { ...state, usersList: [...state.usersList, action.payload] };
  // Cada 'case' traz o tipo da action, conforme definido e o seu retorno.
  case AuthTypes.LOGOUT:
    return { ...state, isLogged: false, currentUser: {} };
=======
const INITIAL_STATE = { email: '' };

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'EMAIL':
    return { email: action.email };
>>>>>>> 9377cce30b0885da3044cf40103827911c71c9f6
  default:
    return state;
  }
};

export default userReducer;
