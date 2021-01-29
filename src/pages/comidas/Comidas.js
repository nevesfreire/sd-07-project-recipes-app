import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/header/Header';
import BarraBuscaComidas from '../../components/searchbar/BarraBuscaComidas';
import Footer from '../../components/footer/Footer';

class Comidas extends Component {
  render() {
    const { toggle, history } = this.props;
    return (
      <div>
        <Header title="Comidas" />
        {toggle && <BarraBuscaComidas history={ history } />}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  toggle: state.reducerSearchBar.toggle,
});

export default connect(mapStateToProps)(Comidas);

Comidas.propTypes = {
  toggle: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
