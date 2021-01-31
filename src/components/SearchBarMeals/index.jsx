import React from 'react';
import { Form, Button, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getByIngredientsMeals,
  getByNameMeals,
  getByLetterMeals,
} from '../../store/ducks/receitasDeComidas/actions';

class SearchBarMeals extends React.Component {
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
      getByIngredientsMealsD,
      getByNameMealsD,
      getByLetterMealsD,
    } = this.props;
    if (searchRadio === 'ingredient') {
      await getByIngredientsMealsD(searchInput);
      return this.emptyMeal();
    }
    if (searchRadio === 'name') {
      await getByNameMealsD(searchInput);
      return this.emptyMeal();
    }
    if (searchInput.length > 1) {
      return this.setState({ alertLetter: true });
    }
    if (searchRadio === 'firstLetter') {
      await getByLetterMealsD(searchInput);
      this.emptyMeal();
      return this.setState({ alertLetter: false });
    }
  }

  emptyMeal() {
    const { mealsStore } = this.props;
    if (!mealsStore) {
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
            {alertLetter
              ? alert('Sua busca deve conter somente 1 (um) caracter')
              : null}
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

SearchBarMeals.propTypes = {
  getByIngredientsMealsD: PropTypes.func.isRequired,
  getByNameMealsD: PropTypes.func.isRequired,
  getByLetterMealsD: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getByIngredientsMealsD: (ingredient) => dispatch(getByIngredientsMeals(ingredient)),
  getByNameMealsD: (name) => dispatch(getByNameMeals(name)),
  getByLetterMealsD: (letter) => dispatch(getByLetterMeals(letter)),
});

const mapStateToProps = (state) => ({
  mealsStore: state.receitasDeComidas.meals.meals,
});

SearchBarMeals.propTypes = {
  mealsStore: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarMeals);
