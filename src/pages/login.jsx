import React from 'react';
import InputsLogin from '../components/InputsLogin';
import Description from '../components/Description';

function Login() {
  return (
    <section className="background">
      <div className="main-container">
        <div className="main-input">
          <Description />
          <InputsLogin />
        </div>
      </div>
    </section>
  );
}

export default Login;
