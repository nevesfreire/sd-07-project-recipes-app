import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendEmail } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.inputValidation = this.inputValidation.bind(this);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick() {
    const { updateEmail, history } = this.props;
    const { email } = this.state;
    updateEmail(email);
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const emailData = JSON.stringify({ email });
    localStorage.setItem('user', emailData);
    history.push('/comidas');
  }

  inputValidation() {
    const { email, password } = this.state;
    const emailRe = /\S+@\S+\.\S+/;
    const passwordMinLength = 7;
    return emailRe.test(email) && password.length >= passwordMinLength;
  }

  render() {
    return (
      <div>
        <input
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <input
          type="password"
          name="password"
          placeholder="Digite sua senha"
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !this.inputValidation() }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateEmail: (email) => dispatch(sendEmail(email)),
});

Login.propTypes = {
  updateEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
