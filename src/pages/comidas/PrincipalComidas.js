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

  mapMeals() {
    const { receitas } = this.props;
    return (
      receitas.meals.map((receitas) => <div key={ receitas }>Texto </div>)
    );
  }

  render() {
    const { history, receitas } = this.props;
    const redirecionar = receitas.meals.length === 1;
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
  receitas: PropTypes.objectOf().isRequired,
};

const mapStateToProps = (state) => ({
  receitas: state.fastFood.receitas,
});

const mapDispatchToProps = (dispatch) => ({
  setlocal: (tipo) => dispatch(setLocal(tipo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrincipalComidas);
