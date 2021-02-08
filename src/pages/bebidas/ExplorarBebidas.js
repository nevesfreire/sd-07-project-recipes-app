import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import Footer from '../../components/footer';

class ExplorarBebidas extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.push('/bebidas/178319');
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <Header title="Explorar Bebidas" searchOn="off" history={ history } />
        <Footer history={ history } />
        <div>
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
            onClick={ this.handleClick }
          >
            Me Surpreenda!
          </button>
        </div>
      </div>
    );
  }
}

ExplorarBebidas.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
};

export default ExplorarBebidas;
