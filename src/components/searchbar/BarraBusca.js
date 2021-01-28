import React, { Component } from 'react';
import { getIngredients } from '../../redux/actions';

class BarraBusca extends Component {
  constructor() {
    super();
    this.state = {
      busca: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
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
            name="select-search"
            id="ingredient"
            type="radio"
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="name">
          Ingrediente
          <input
            name="select-search"
            type="radio"
            data-testid="name-search-radio"
          />
        </label>
        <label htmlFor="letter">
          Primeira letra
          <input
            name="select-search"
            type="radio"
            data-testid="first-letter-search-radio"
          />
        </label>
        <button
          type="button"
          id="botão"
          data-testid="exec-search-btn"
          onClick={ getIngredients('chicken_breast') }
        >
          Buscar
        </button>
      </div>
    );
  }
}

export default BarraBusca;
