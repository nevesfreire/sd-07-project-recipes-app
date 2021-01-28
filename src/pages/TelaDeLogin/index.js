import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendEmail } from '../../store/ducks/login/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  handleClick() {
    const { email } = this.state;
    const validEmail = { email };
    const { history } = this.props;
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(validEmail));

    history.push({
      pathname: '/comidas',
    });
  }

  validateLogin() {
    const { email, password } = this.state;
    const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const result = regexEmail.test(email);
    const maxVal = 6;
    if (result && password.length > maxVal) return false;
    return true;
  }

  render() {
    const { email, password } = this.state;
    const { addEmail } = this.props;
    return (
      <div>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            placeholder="Digite seu email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            data-testid="password-input"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ this.validateLogin() }
          onClick={ () => {
            this.handleClick();
            addEmail(email);
          } }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEmail: (e) => dispatch(sendEmail(e)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  addEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
