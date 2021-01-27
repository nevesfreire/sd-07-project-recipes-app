import { useState } from 'react';

function useLogin() {
  const getFilterEmail = (email, password) => {
    const number = 6;
    if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && password.length > number) {
      return false;
    }
    return true;
  };

  const [user, setUser] = useState({
    email: '',
    password: '',
    route: false,
  });

  const handlerChangeLogin = ({ target }) => {
    const { name, value } = target;
    const emailPass = { ...user };
    emailPass[name] = value;
    setUser(emailPass);
  };

  const handlerClickLogin = () => {
    setUser({ ...user, route: true });
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
  };

  const { email, password, route } = user;

  return [email, password, route, getFilterEmail,
    handlerChangeLogin, handlerClickLogin];
}

export default useLogin;
