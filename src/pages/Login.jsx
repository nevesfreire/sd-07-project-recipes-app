import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
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
    const color = 'rgba(251, 125, 6, 0.973)';
    return (
      <div className="login">
        <h1>App de Receitas</h1>
        <form>
          <InputGroup style={ { width: '250px', marginLeft: '140px' } }>
            <InputGroup.Prepend>
              <InputGroup.Text
                style={
                  { backgroundColor: 'rgb(245, 176, 36)',
                    borderColor: color,
                    borderTopLeftRadius: '15px',
                    borderBottomLeftRadius: '15px' }
                }
                id="basic-addon1"
              >
                EMAIL
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              style={
                { borderColor: color,
                  borderTopRightRadius: '15px',
                  borderBottomRightRadius: '15px' }
              }
              type="text"
              name="email"
              value={ email }
              placeholder="Insira seu email"
              data-testid="email-input"
              onChange={ this.handleChange }
              autoComplete="username"
            />
          </InputGroup>
          <InputGroup
            style={
              { width: '250px',
                marginLeft: '140px',
                marginTop: '10px' }
            }
          >
            <InputGroup.Prepend>
              <InputGroup.Text
                style={
                  { backgroundColor: 'rgb(245, 176, 36)',
                    borderColor: color,
                    borderTopLeftRadius: '15px',
                    borderBottomLeftRadius: '15px' }
                }
                id="basic-addon1"
              >
                PASSWORD
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              style={
                { borderColor: color,
                  borderTopRightRadius: '15px',
                  borderBottomRightRadius: '15px' }
              }
              type="password"
              name="password"
              value={ password }
              placeholder="Insira sua senha"
              data-testid="password-input"
              onChange={ this.handleChange }
              autoComplete="current-password"
            />
          </InputGroup>
          <Button
            style={ { marginTop: '10px', color: 'black' } }
            variant="outline-danger"
            type="button"
            disabled={ this.verifyLogin() }
            data-testid="login-submit-btn"
            onClick={ () => {
              this.handleClick();
              sendLoginInfoDispatch(email);
            } }
          >
            Entrar
          </Button>
        </form>

        <p
          style={
            { marginTop: '203px',
              background: 'rgb(246, 183, 89)',
              fontSize: '12px',
              opacity: '0.8' }
          }
        >
          Made by Group 2 - Bella, Thadeu and Vanessa
        </p>
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
