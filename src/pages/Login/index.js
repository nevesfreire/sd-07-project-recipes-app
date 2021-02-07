import React from 'react';
import { LoginForm } from '../../Components';
import './styles.css';
import logo from '../../images/ReduggestLogo.png';

const Login = () => (
  <>
    <LoginForm />
    <div className="dev-by">
      <div>
        <h6>Developed By:</h6>
        <h2>Team Reduggets</h2>
      </div>
      <div>
        <img className="imgLogoReduggets" width="60px" src={ logo } alt="logo Rediggets" />
      </div>
    </div>
  </>
);

export default Login;
