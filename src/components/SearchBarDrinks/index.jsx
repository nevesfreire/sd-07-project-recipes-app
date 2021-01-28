import React from 'react';
import { Form, Button, Navbar, Alert } from 'react-bootstrap';
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

  searchBtnClick() {
    const { searchInput, searchRadio } = this.state;
    const {
      getByIngredientsDrinksD,
      getByNameDrinksD,
      getByLetterDrinksD,
    } = this.props;
    if (searchRadio === 'ingredient') {
      return getByIngredientsDrinksD(searchInput);
    }
    if (searchRadio === 'name') {
      return getByNameDrinksD(searchInput);
    }
    if (searchInput.length > 1) {
      return this.setState({ alertLetter: true });
    }
    if (searchRadio === 'firstLetter') {
      getByLetterDrinksD(searchInput);
      return this.setState({ alertLetter: false });
    }
  }

  render() {
    const { searchInput, alertLetter } = this.state;
    return (
      <Navbar>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            {alertLetter ? (
              <Alert variant="danger">
                Sua busca deve conter somente 1 (um) caracter
              </Alert>
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

export default connect(null, mapDispatchToProps)(SearchBarDrinks);
