import React from 'react';
import PropTypes from 'prop-types';

export default function CustomLogin({
  onInputChange,
  onHandleSubmit,
  validate,
}) {
  return (
    <form>
      <input
        data-testid="email-input"
        maxLength="50"
        placeholder="Email"
        name="email"
        onChange={ onInputChange }
      />
      <input
        data-testid="password-input"
        maxLength="40"
        placeholder="Senha"
        name="password"
        type="password"
        onChange={ onInputChange }
      />
      <button
        type="button"
        onClick={ onHandleSubmit }
        data-testid="login-submit-btn"
        disabled={ validate }
      >
        Enviar
      </button>
    </form>
  );
}

CustomLogin.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onHandleSubmit: PropTypes.func.isRequired,
  validate: PropTypes.bool.isRequired,
};
