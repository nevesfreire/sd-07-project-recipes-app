import { useContext } from 'react';
import context from '../contextAPI/context';

const LoginValidation = (email, senha) => {
  const { state, setState } = useContext(context);
  const NUM_PASSWORD = 6;

  !((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email) && senha.length > NUM_PASSWORD);

  setState([
    ...state,
    {
      LoginValidation: false,
    },
  ]);
};

export default LoginValidation;
