import { useContext } from 'react';
import context from '../contextAPI/context';

const LoginValidation = (user, passwd) => {
  const { state, setState } = useContext(context);
  const NUM_PASSWORD = 6;
  
  if (user && passwd)
  ((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(user) && (passwd.length > NUM_PASSWORD)) && setState((s) => ({ ...s, user, passwd, isDisabled: false }))

};

export default LoginValidation;
