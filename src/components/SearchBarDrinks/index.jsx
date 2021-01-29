import React from 'react';
import { Form, Button, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getByIngredientsDrinks,
  getByNameDrinks,
  getByLetterDrinks,
} from '../../store/ducks/receitasDeBebidas/actions';

class SearchBarDrinks extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      searchInput: '',
      searchRadio: '',
      alertLetter: false,
    };
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  async searchBtnClick() {
    const { searchInput, searchRadio } = this.state;
    const {
      getByIngredientsDrinksD,
      getByNameDrinksD,
      getByLetterDrinksD,
    } = this.props;
    if (searchRadio === 'ingredient') {
      await getByIngredientsDrinksD(searchInput);
      return this.emptyDrink();
    }
    if (searchRadio === 'name') {
      await getByNameDrinksD(searchInput);
      return this.emptyDrink();
    }
    if (searchInput.length > 1) {
      return this.setState({ alertLetter: true });
    }
    if (searchRadio === 'firstLetter') {
      await getByLetterDrinksD(searchInput);
      this.emptyDrink();
      return this.setState({ alertLetter: false });
    }
  }

  emptyDrink() {
    const { drinksStore } = this.props;
    if (!drinksStore) {
      return alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }
  }

  render() {
    const { searchInput, alertLetter } = this.state;
    return (
      <Navbar>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            {alertLetter ? (
              alert('Sua busca deve conter somente 1 (um) caracter')
            ) : null}
            <Form.Label>Buscar</Form.Label>
            <Form.Control
              type="text"
              placeholder="Buscar Receita"
              data-testid="search-input"
              name="searchInput"
              value={ searchInput }
              onChange={ this.handleChange }
            />
          </Form.Group>
          <Form.Check
            inline
            label="Ingrediente"
            type="radio"
            name="searchRadio"
            value="ingredient"
            onChange={ this.handleChange }
            data-testid="ingredient-search-radio"
          />
          <Form.Check
            data-testid="name-search-radio"
            inline
            label="Nome"
            type="radio"
            name="searchRadio"
            value="name"
            onChange={ this.handleChange }
          />
          <Form.Check
            inline
            label="Primeira Letra"
            type="radio"
            name="searchRadio"
            value="firstLetter"
            onChange={ this.handleChange }
            data-testid="first-letter-search-radio"
          />
        </Form>
        <Button
          variant="primary"
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => this.searchBtnClick() }
        >
          Buscar
        </Button>
      </Navbar>
    );
  }
}

SearchBarDrinks.propTypes = {
  getByIngredientsDrinksD: PropTypes.func.isRequired,
  getByNameDrinksD: PropTypes.func.isRequired,
  getByLetterDrinksD: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getByIngredientsDrinksD: (ingredient) => dispatch(getByIngredientsDrinks(ingredient)),
  getByNameDrinksD: (name) => dispatch(getByNameDrinks(name)),
  getByLetterDrinksD: (letter) => dispatch(getByLetterDrinks(letter)),
});

const mapStateToProps = (state) => ({
  drinksStore: state.receitasDeBebidas.drinks.drinks,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarDrinks);
