import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header/Header';

export default class Explorar extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header title="Explorar" />
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
        <Footer />
      </div>
    );
  }
}

Explorar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
