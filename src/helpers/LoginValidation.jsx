import { useContext } from 'react';
import context from '../contextAPI/context';

const LoginValidation = () => {
  const { user, passwd, setState } = useContext(context);
  const NUM_PASSWORD = 5;

  if (user && passwd) {
    const emailTest = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(user);
    const passLength = (passwd.length > NUM_PASSWORD);
    if (emailTest && passLength) {
      setState((s) => ({ ...s, user, passwd, isDisabled: false }));
    }
  }
};

export default LoginValidation;
