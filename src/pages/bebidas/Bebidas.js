import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/header/Header';
import BarraBuscaBebidas from '../../components/searchbar/BarraBuscaBebidas';
import Footer from '../../components/footer/Footer';

class Bebidas extends React.Component {
  render() {
    const { toggle, history } = this.props;
    return (
      <div>
        <Header title="Bebidas" />
        {toggle && <BarraBuscaBebidas history={ history } />}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  toggle: state.reducerSearchBar.toggle,
});

export default connect(mapStateToProps)(Bebidas);

Bebidas.propTypes = {
  toggle: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
