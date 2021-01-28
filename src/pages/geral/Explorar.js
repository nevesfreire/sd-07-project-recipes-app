import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import Footer from '../../components/footer';

class Explorar extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header title="Explorar" searchOn="off" history={ history } />
        <Footer history={ history } />
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
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
};

export default Explorar;
