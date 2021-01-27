// Neste arquivo para cada pagina que iremos gerenciar os estados atraves do Redux realizaremos as alteracoes conforme indicado abaixo:

import { combineReducers } from 'redux';

import login from './login';
import receitasDeBebidas from './receitasDeBebidas';
import receitasDeComidas from './receitasDeComidas';
// Aqui importamos o reducer da pagina em questao conforme os exemplos acima.

export default combineReducers({
  login,
  receitasDeBebidas,
  receitasDeComidas,
  // Aqui exportamos o reducer da pagina em questao conforme os exemplos acima.
});
