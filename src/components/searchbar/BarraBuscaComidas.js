import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resultIngredients, resultName, resultLetter, resultID } from '../../redux/actionsComidas';

class BarraBuscaComidas extends Component {
  constructor() {
    super();
    this.state = {
      busca: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchContent = this.searchContent.bind(this);
    this.findContent = this.findContent.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  findContent() {
    const { resultApi, history, getByID } = this.props;
    if (resultApi === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (resultApi.length === 1) {
      getByID(resultApi[0].idMeal);
      history.push(`/comidas/${resultApi[0].idMeal}`);
    }
  }

  async searchContent() {
    const { getIngredient, getName, getLetter } = this.props;
    const { busca, select } = this.state;
    switch (select) {
    case 'nome':
      await getName(busca);
      break;
    case 'ingrediente':
      await getIngredient(busca);
      break;
    case 'letra':
      if (busca.length === 1) {
        await getLetter(busca);
      } else {
        alert('Sua busca deve conter somente 1 (um) caracter');
      }
      break;
    default:
      return null;
    }
    this.findContent();
  }

  render() {
    const { busca } = this.state;
    return (
      <div>
        <fieldset>
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
          <label htmlFor="name">
            Nome
            <input
              name="select"
              id="name"
              type="radio"
              data-testid="name-search-radio"
              value="nome"
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
              value="ingrediente"
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
        </fieldset>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resultApi: state.reducerComidas.recipesByName,
});

const mapDispatchToProps = (dispatch) => ({
  getIngredient: (ingredient) => dispatch(resultIngredients(ingredient)),
  getName: (name) => dispatch(resultName(name)),
  getLetter: (letter) => dispatch(resultLetter(letter)),
  getByID: (id) => dispatch(resultID(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BarraBuscaComidas);

BarraBuscaComidas.propTypes = {
  getIngredient: PropTypes.func.isRequired,
  getName: PropTypes.func.isRequired,
  getLetter: PropTypes.func.isRequired,
  resultApi: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
