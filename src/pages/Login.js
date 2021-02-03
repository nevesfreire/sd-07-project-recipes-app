import React from 'react';
import PropTypes from 'prop-types';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.isDisable = this.isDisable.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { email } = this.state;
    const { history } = this.props;
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/Comidas');
  }

  isDisable() {
    const { email, password } = this.state;
    const SIX = 6;
    if (email.includes('@') && email.includes('.com') && password.length > SIX) {
      return false;
    }
    return true;
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <input
          type="email"
          name="email"
          data-testid="email-input"
          value={ email }
          onChange={ this.handleChange }
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
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
