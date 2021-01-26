import React from 'react';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.isDisable = this.isDisable.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  isDisable() {
    const { email, password } = this.state;
    const SIX = 6;
    if (email.includes('@') && email.includes('.com') && password.length >= SIX) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div>
        <input
          type="email"
          name="email"
          data-testid="email-input"
          value={ email }
          onChance={ this.handleChange }
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          value={ password }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ this.isDisable() }
        >
          Entrar
        </button>
      </div>
    );
  }
}
