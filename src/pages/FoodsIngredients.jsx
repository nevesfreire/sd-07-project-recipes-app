import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CustomFooter, CustomIngredientsFoods } from '../components';
import CustomHeader from '../components/CustomHeader';
import { getIngredients } from '../services';

export default class FoodsIngredients extends Component {
  constructor() {
    super();
    this.renderIngredients = this.renderIngredients.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
    this.state = {
      meals: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.handleIngredients();
  }

  async handleIngredients() {
    const { meals } = await getIngredients();
    this.setState({
      meals,
      isLoading: false,
    });
  }

  renderIngredients() {
    const { meals } = this.state;
    const LENGTH = 11;
    const INITIAL_LENGTH = 0;
    const MAX_LENGTH = meals.length > LENGTH ? LENGTH : meals.length;
    return (
      <div>
        { meals.slice(INITIAL_LENGTH, MAX_LENGTH).map((meal, index) => (
          <CustomIngredientsFoods
            key={ meal.idIngredient }
            index={ index }
            meal={ meal }
          />
        ))}
      </div>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        <CustomHeader
          title="
          Explorar Ingredientes"
          showSearchTopBtn={ false }
        />
        { isLoading ? <p>Carregando</p>
          : this.renderIngredients()}
        <CustomFooter />
      </div>
    );
  }
}

FoodsIngredients.propTypes = {
  dispatchFoodRecipes: PropTypes.func.isRequired,
  dispatchUpdateFoodIsFetching: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  meals: PropTypes.shape({
    length: PropTypes.number.isRequired,
    slice: PropTypes.func.isRequired,
  }).isRequired,
};
