import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

class Explorar extends Component {
  render() {
    const { history } = this.props;
    const title = 'Explorar';
    return (
      <div>
        <Header title={ title } />
        <Footer />
        <div>
          <button
            type="button"
            data-testid="explore-food"
            onClick={ () => history.push('/explorar/comidas') }
          >
            Explorar Comidas
          </button>

          <button
            type="button"
            data-testid="explore-drinks"
            onClick={ () => history.push('/explorar/bebidas') }
          >
            Explorar Bebidas
          </button>
        </div>
      </div>
    );
  }
}

Explorar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Explorar;
