// Este arquivo nao recebe nenhuma outra informacao.

import { createStore } from 'redux';
import rootReducer from './ducks/rootReducer';

const store = createStore(rootReducer);

export default store;
