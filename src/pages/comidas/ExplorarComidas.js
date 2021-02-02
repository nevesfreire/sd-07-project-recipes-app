import React from 'react';
import PropTypes from 'prop-types';
import Header2 from '../../components/header/Header2';
import Footer from '../../components/footer/Footer';

class ExplorarComidas extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header2 title="Explorar Comidas" />
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-by-area"
          onClick={ () => history.push('/explorar/comidas/area') }
        >
          Por Local de Origem
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

ExplorarComidas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExplorarComidas;
