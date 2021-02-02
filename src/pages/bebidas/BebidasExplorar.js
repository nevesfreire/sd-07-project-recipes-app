import React from 'react';
import PropTypes from 'prop-types';
import Header2 from '../../components/header/Header2';
import Footer from '../../components/footer/Footer';

class BebidasExplorar extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header2 title="Explorar Bebidas" />
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
        <Footer />
      </div>);
  }
}

BebidasExplorar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default BebidasExplorar;
