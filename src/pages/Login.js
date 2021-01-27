import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions/LoginActions';

// eslint-disable-next-line max-lines-per-function
function Login(props) {
  const [state, setState] = useState({
    password: '',
    email: '',
    isDisable: true,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { password, email } = state;

  const validateLogin = () => {
    const NUM_PASSWORD = 6;

    setState({
      ...state,
      isDisable:

      !((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)

      && password.length > NUM_PASSWORD),
    });
  };

  useEffect(() => validateLogin(), [state.email, state.password]);

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const setLocalStorageData = () => {
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email: state.email }));
  };

  const handleSubmit = () => {
    const {
      dispatchEmail,
    } = props;
    dispatchEmail(email);
    setLocalStorageData();
    setIsLoggedIn(true);
  };

  const renderRedirect = () => <Redirect to="/comidas" />;

  // eslint-disable-next-line max-lines-per-function
  const render = () => {
    const { isDisable } = state;
    return (
      <div>
        <form>
          <label htmlFor="input-gravatar-email">
            <input
              type="text"
              placeholder="email"
              name="email"
              value={ email }
              data-testid="email-input"
              onChange={ (e) => handleChange(e) }
            />
          </label>
          <label htmlFor="input-player-name">
            <input
              type="text"
              placeholder="Senha"
              name="password"
              value={ password }
              data-testid="password-input"
              onChange={ (e) => handleChange(e) }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ isDisable }
            onClick={ () => handleSubmit() }
          >
            Entrar
          </button>
          {}
        </form>
      </div>
    );
  };

  return isLoggedIn ? renderRedirect() : render();
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(addEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
