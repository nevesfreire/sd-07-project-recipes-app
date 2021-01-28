import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmail } from '../actions';
import { getCocktailsByFirstLetter, getCocktailsByName, getCocktailsByIngredient } from '../services/cocktailsAPI';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.verifyEmailAndPassword = this.verifyEmailAndPassword.bind(this);
  }

  async componentDidMount() {
    const resposta = await getCocktailsByFirstLetter('f');
    const resposta2 = await getCocktailsByName('Foxy Lady');
    const resposta3 = await getCocktailsByIngredient('lemon');
    console.log(resposta);
    console.log(resposta2);
    console.log(resposta3);
  }

  handleSubmit() {
    const { sendEmail, history } = this.props;
    const { email } = this.state;
    sendEmail(email);
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const emailInfo = JSON.stringify({ email });
    localStorage.setItem('user', emailInfo);
    history.push('/comidas');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  verifyEmailAndPassword() {
    const { email, password } = this.state;
    const minLength = 6;
    const re = /\S+@\S+\.\S+/;
    return re.test(email) && password.length >= minLength;
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            Email
            <input
              placeholder="Digite seu email"
              data-testid="email-input"
              value={ email }
              onChange={ this.handleChange }
              name="email"
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              placeholder="Digite sua senha"
              data-testid="password-input"
              type="password"
              value={ password }
              onChange={ this.handleChange }
              name="password"
            />
          </label>
        </form>
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !this.verifyEmailAndPassword() }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (email) => dispatch(getEmail(email)),
});

Login.propTypes = {
  sendEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
