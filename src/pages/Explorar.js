import React from 'react';
import PropTypes from 'prop-types';
import Header2 from '../components/header/Header2';
import Footer from '../components/footer/Footer';

export default class Explorar extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header2 title="Explorar" />
        <button
          type="button"
          data-testid="explore-food"
          onClick={ () => history.push('/explorar/comidas') }
          className="btn btn-info"
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explorar/bebidas') }
          className="btn btn-info"
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
