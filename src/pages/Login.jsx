import React from 'react';
import '../css/login.css';
import InputEmail from '../components/InputEmail';
import InputSenha from '../components/InputSenha';
import InputButton from '../components/InputButton';
import Description from '../components/Description';

function Login() {
  return (
    <section className="main-container">
      <div className="main-input">
        <Description />
        <InputEmail />
        <InputSenha />
        <InputButton />
      </div>
    </section>
  );
}

export default Login;
