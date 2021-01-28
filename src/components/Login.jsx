import React from 'react';

function Login() {

  return (
    <div>
      <header>
        <h1>Coffee and Code</h1>
      </header>
      <section>
        <input
          type="email"
          name="email"
          onChange={ isEmail }
          data-testid="email-input"
          placeholder="example@email.com"
        />
        <input
          type="password"
          name="password"
          onChange={ isPassword }
          data-testid="password-input"
        />
        <button
          data-testid="login-submit-btn"
          type="button"
        >
          Enter
        </button>
      </section>
    </div>
  );
}

export default Login;
