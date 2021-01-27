import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import { setLocal } from '../../redux/action';

class PrincipalComidas extends Component {
  componentDidMount() {
    const { setlocal } = this.props;
    setlocal('comidas');
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <Header title="Comidas" searchOn="on" history={ history } />
      </div>
    );
  }
}

PrincipalComidas.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
  setlocal: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setlocal: (tipo) => dispatch(setLocal(tipo)),
});

export default connect(null, mapDispatchToProps)(PrincipalComidas);
