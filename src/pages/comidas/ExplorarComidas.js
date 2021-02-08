import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import Footer from '../../components/footer';

class ExplorarComidas extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.push('/comidas/52771');
  }

  render() {
    const { history } = this.props;

    return (
      <div>
        <Header title="Explorar Comidas" searchOn="off" history={ history } />
        <Footer history={ history } />
        <div>
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
            onClick={ this.handleClick }
          >
            Me Surpreenda!
          </button>
        </div>
      </div>
    );
  }
}

ExplorarComidas.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
};

export default ExplorarComidas;
