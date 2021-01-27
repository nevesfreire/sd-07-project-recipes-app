// Neste arquivo serao inseridas e exportadas todas as acoes referentes a pagina em questao
// Exemplo:

// Importamos o tipo da acao:
import { AuthTypes } from './types';

// Exportamos a funcao com o seu tipo e o payload:
export const signIn = (user) => ({
  type: AuthTypes.SIGNIN,
  payload: user,
});

// Exportamos a funcao com o seu tipo e o payload:
export const signUp = (user) => ({
  type: AuthTypes.SIGNUP,
  payload: user,
});

// Exportamos a funcao com o seu tipo e o payload:
export const logOut = () => ({
  type: AuthTypes.LOGOUT,
});
