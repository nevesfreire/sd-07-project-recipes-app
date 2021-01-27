import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendLoginInfo } from '../redux/actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  handleClick() {
    const { email } = this.state;
    const localEmail = { email };

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(localEmail));

    const { history } = this.props;
    history.push('/comidas');
  }

  verifyLogin() {
    const { email, password } = this.state;
    const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const validateEmail = regexEmail.test(email);
    const SIX = 6;
    const validatePassword = password.length > SIX;

    if (validateEmail && validatePassword) {
      return false;
    }

    return true;
  }

  render() {
    const { email, password } = this.state;
    const { sendLoginInfoDispatch } = this.props;

    return (
      <div>
        <h1>App de Receitas</h1>
        <form>
          <input
            type="text"
            name="email"
            value={ email }
            placeholder="Insira seu email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />

          <input
            type="password"
            name="password"
            value={ password }
            placeholder="Insira sua senha"
            data-testid="password-input"
            onChange={ this.handleChange }
          />

          <button
            type="button"
            disabled={ this.verifyLogin() }
            data-testid="login-submit-btn"
            onClick={ () => {
              this.handleClick();
              sendLoginInfoDispatch(email);
            } }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendLoginInfoDispatch: (e) => dispatch(sendLoginInfo(e)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  sendLoginInfoDispatch: PropTypes.func.isRequired,
};
