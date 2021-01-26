import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { setStorage } from '../services';
import { CustomLogin } from '../components';
import { addEmailAction, addPasswordAction } from '../redux/actions';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      email: '',
      buttonDisable: true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validaInput = this.validaInput.bind(this);
  }

  handleSubmit() {
    const { email, password } = this.state;
    const { history, dispatchEmail, dispatchPassword } = this.props
    dispatchEmail(email)
    dispatchPassword(password)
    history.push('/');
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({ [name]: value }, this.validaInput);
  }

  validaInput() {
    const { email, password } = this.state;
    console.log(password.length)
    const number = 6;
    if (email.match(/\S+@\S+\.\S+/) && password.length > number) {
      this.setState({ buttonDisable: false });
    } else {
      this.setState({ buttonDisable: true });
    }
  }

  render() {
    const { buttonDisable } = this.state;
    return (
      <div className="margin-page">
        <CustomLogin
          onInputChange={this.handleInputChange}
          onHandleSubmit={this.handleSubmit}
          validate={ buttonDisable }
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (e) => dispatch(addEmailAction(e)),
  dispatchPassword: (e) => dispatch(addPasswordAction(e)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  dispatchEmail: PropTypes.func.isRequired,
  dispatchNome: PropTypes.func.isRequired,
  dispatchToken: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};
