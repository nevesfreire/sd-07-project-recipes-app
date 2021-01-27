import { createContext } from 'react';
import { initialState } from '../data/dataLogin';

const GlobalContext = createContext(initialState);

export default GlobalContext;
