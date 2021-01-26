import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <form>
          <input
            data-testid="email-input"
            type="email"
          />
          <input
            data-testid="password-input"
            type="password"
          />
          <button
            data-testid="login-submit-btn"
            type="button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
