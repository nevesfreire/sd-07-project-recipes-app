import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resultIngredients, resultName, resultLetter } from '../../redux/actions';

class BarraBusca extends Component {
  constructor() {
    super();
    this.state = {
      busca: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchContent = this.searchContent.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  searchContent() {
    const { getIngredient, getName, getLetter } = this.props;
    const { busca, select } = this.state;
    switch (select) {
    case 'nome':
      getName(busca);
      break;
    case 'ingrediente':
      getIngredient(busca);
      break;
    case 'letra':
      if (busca.length !== 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        getLetter(busca);
      }
      break;
    default:
      return null;
    }
  }

  render() {
    const { busca } = this.state;
    return (
      <div>
        <label htmlFor="busca">
          <input
            type="text"
            name="busca"
            id="busca"
            value={ busca }
            onChange={ this.handleChange }
            data-testid="search-input"
          />
        </label>
        <label htmlFor="ingredient">
          Nome
          <input
            name="select"
            id="ingredient"
            type="radio"
            data-testid="name-search-radio"
            value="nome"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="name">
          Ingrediente
          <input
            name="select"
            type="radio"
            data-testid="ingredient-search-radio"
            value="ingrediente"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="letter">
          Primeira letra
          <input
            name="select"
            type="radio"
            data-testid="first-letter-search-radio"
            value="letra"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          id="botão"
          data-testid="exec-search-btn"
          onClick={ this.searchContent }
        >
          Buscar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getIngredient: (ingredient) => dispatch(resultIngredients(ingredient)),
  getName: (name) => dispatch(resultName(name)),
  getLetter: (letter) => dispatch(resultLetter(letter)),
});

export default connect(null, mapDispatchToProps)(BarraBusca);

BarraBusca.propTypes = {
  getIngredient: PropTypes.func.isRequired,
  getName: PropTypes.func.isRequired,
  getLetter: PropTypes.func.isRequired,
};
