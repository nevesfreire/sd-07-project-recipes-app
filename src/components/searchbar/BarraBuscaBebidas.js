import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resultIngredientsBebida,
  resultNameBebida,
  resultLetterBebida } from '../../redux/actionsBebidas';

class BarraBuscaBebidas extends Component {
  constructor() {
    super();
    this.state = {
      buscaBebida: '',
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
    const { getIngredientBebida, getNameBebida, getLetterBebida } = this.props;
    const { buscaBebida, select } = this.state;
    switch (select) {
    case 'nomeBebida':
      getNameBebida(buscaBebida);
      break;
    case 'ingredienteBebida':
      getIngredientBebida(buscaBebida);
      break;
    case 'letraBebida':
      if (buscaBebida.length !== 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        getLetterBebida(buscaBebida);
      }
      break;
    default:
      return null;
    }
  }

  render() {
    const { buscaBebida } = this.state;
    const { toggle } = this.props;
    return (
      <div>
        {toggle && <fieldset>
          <label htmlFor="busca">
            <input
              type="text"
              name="buscaBebida"
              id="busca"
              value={ buscaBebida }
              onChange={ this.handleChange }
              data-testid="search-input"
            />
          </label>
          <label htmlFor="name">
            Nome
            <input
              name="select"
              id="name"
              type="radio"
              data-testid="name-search-radio"
              value="nomeBebida"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="ingredient">
            Ingrediente
            <input
              name="select"
              id="ingredient"
              type="radio"
              data-testid="ingredient-search-radio"
              value="ingredienteBebida"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="letter">
            Primeira letra
            <input
              name="select"
              id="letter"
              type="radio"
              data-testid="first-letter-search-radio"
              value="letraBebida"
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
        </fieldset>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  toggle: state.reducerSearchBar.toggle,
});

const mapDispatchToProps = (dispatch) => ({
  getIngredientBebida: (ingredient) => dispatch(resultIngredientsBebida(ingredient)),
  getNameBebida: (name) => dispatch(resultNameBebida(name)),
  getLetterBebida: (letter) => dispatch(resultLetterBebida(letter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BarraBuscaBebidas);

BarraBuscaBebidas.propTypes = {
  getIngredientBebida: PropTypes.func.isRequired,
  getNameBebida: PropTypes.func.isRequired,
  getLetterBebida: PropTypes.func.isRequired,
  toggle: PropTypes.bool.isRequired,
};
