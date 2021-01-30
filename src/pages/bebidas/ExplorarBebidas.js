import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import Footer from '../../components/footer';

class ExplorarBebidas extends Component {
  constructor() {
    super();
    this.state = {
      receita: {},
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.push('/bebidas/178319');
  }

  Meals() {
    const { receita } = this.state;
    return (
      <button
        className="card"
        name={ receita.idMeal }
        type="button"
        onClick={ ({ target }) => this.handleClick(target.name) }
      >
        <img
          className="card"
          name={ receita.idMeal }
          src={ receita.strMealThumb }
          alt="imagem da receita"
        />
        <h1
          className="card"
          name={ receita.idMeal }
        >
          {receita.strMeal}
        </h1>
      </button>
    );
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
