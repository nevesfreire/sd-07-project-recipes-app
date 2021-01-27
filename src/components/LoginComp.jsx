import React from 'react';
import PropTypes from 'prop-types';

export default function LoginComp({ changeState, submitUser, valid }) {
  return (
    <div>
      <h3>Login</h3>
      <div>
        <label htmlFor="email-input">
          Email:
          <input
            data-testid="email-input"
            type="email"
            onChange={ changeState }
          />
        </label>
        <label htmlFor="password-input">
          Senha:
          <input
            data-testid="password-input"
            type="password"
            onChange={ changeState }
          />
        </label>
        {
          valid
            ? <button type="submit" onClick={ submitUser }>Entrar</button>
            : <button type="submit" disabled>Entrar</button>
        }
      </div>
    </div>
  );
}

LoginComp.propTypes = {
  changeState: PropTypes.func.isRequired,
  submitUser: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
};
