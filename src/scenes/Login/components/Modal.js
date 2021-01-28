import React, { useContext } from 'react';
import { LoginContext } from '../../../context/LoginContext';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import logo from '../../../images/ChaBlau.png';

function Modal() {
  const {
    disabled,
    handleSubmit,
  } = useContext(LoginContext);
  return (
    <div className="modal-content">
      <div className="col-12 logo-img">
        <img src={ logo } alt="Chá blau logo" />
      </div>
      <form className="col-12">
        <EmailInput />
        <PasswordInput />
        <button
          data-testid="login-submit-btn"
          type="submit"
          className="btn"
          disabled={ disabled }
          onClick={ () => handleSubmit() }
        >
          Entrar
        </button>
      </form>
      <div className="col-12 forgot">
        <a href="/" onClick={ () => alert('A senha é XABLAU!') }>
          Esqueceu a senha?
        </a>
      </div>
    </div>
  );
}

export default Modal;
