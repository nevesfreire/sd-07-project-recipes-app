import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setReceitas } from '../redux/action';
import {
  fetchFoodIngredient,
  fetchFoodName,
  fetchFoodLetter,
} from '../services';

class Searchbar extends Component {
  constructor() {
    super();
    this.state = {
      busca: '',
      inputValue: '',
    };
    this.handlechange = this.handlechange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handlechange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { local, setreceitas } = this.props;
    const { busca, inputValue } = this.state;
    let object = {};
    switch (busca) {
    case 'ingredient':
      object = fetchFoodIngredient(inputValue, local);
      break;
    case 'name':
      object = fetchFoodName(inputValue, local);
      break;
    case 'first-letter':
      if (inputValue.length === 1) {
        object = fetchFoodLetter(inputValue, local);
      } else {
        alert('Sua busca deve conter somente 1 (um) caracter');
      }
      break;
    default:
      break;
    }
    setreceitas(object);
  }

  render() {
    const { busca, inputValue } = this.state;
    return (
      <div>
        <input
          onChange={ (event) => this.handlechange(event) }
          name="inputValue"
          data-testid="search-input"
          type="text"
          placeholder="Busca"
          value={ inputValue }
        />
        <label htmlFor="ingredient">
          <input
            onChange={ (event) => this.handlechange(event) }
            value="ingredient"
            checked={ busca === 'ingredient' }
            name="busca"
            id="ingredient"
            type="radio"
            data-testid="ingredient-search-radio"
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            onChange={ (event) => this.handlechange(event) }
            value="name"
            checked={ busca === 'name' }
            name="busca"
            id="name"
            type="radio"
            data-testid="name-search-radio"
          />
          Nome
        </label>
        <label htmlFor="first-letter">
          <input
            onChange={ (event) => this.handlechange(event) }
            value="first-letter"
            checked={ busca === 'first-letter' }
            name="busca"
            id="first-letter"
            type="radio"
            data-testid="first-letter-search-radio"
          />
          Primeira letra
        </label>
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ () => this.handleClick() }
        >
          Buscar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setreceitas: (object) => dispatch(setReceitas(object)),
});

const mapStateToProps = (state) => ({
  local: state.fastFood.tipo,
});

Searchbar.propTypes = {
  local: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
