import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resultIngredients } from '../../redux/actions';

class BarraBusca extends Component {
  constructor() {
    super();
    this.state = {
      busca: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { busca } = this.state;
    const { getIngredient } = this.props;
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
            data-testid="ingredient-search-radio"
            value="nome"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="name">
          Ingrediente
          <input
            name="select"
            type="radio"
            data-testid="name-search-radio"
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
          onClick={ getIngredient(busca) }
        >
          Buscar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getIngredient: (ingredient) => dispatch(resultIngredients(ingredient)),
});

export default connect(null, mapDispatchToProps)(BarraBusca);

BarraBusca.propTypes = {
  getIngredient: PropTypes.func.isRequired,
};
