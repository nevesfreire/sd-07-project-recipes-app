import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import signIn from '../../store/ducks/auth/actions';

const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const isDisabled = () => {
    const { email, password } = user;
    const regexp = /\S+@\S+\.\S+/;
    const six = 6;
    if (regexp.test(email) && password.length > six) {
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    dispatch(signIn(user.email));
  };

  return (
    <div>
      <form>
        <input
          data-testid="email-input"
          name="email"
          onChange={ handleChange }
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          onChange={ handleChange }
        />
        <Link to="/comidas">
          <button
            type="submit"
            data-testid="login-submit-btn"
            disabled={ isDisabled() }
            onClick={ handleSubmit }
          >
            Enter
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
