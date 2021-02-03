import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CustomFooter, CustomIngredientsFoods } from '../components';
import CustomHeader from '../components/CustomHeader';
import { getIngredientsFood } from '../services';
import { requestIngredientsFoods } from '../redux/actions/foodRecipesAction';

class FoodsIngredients extends Component {
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
    const { meals } = await getIngredientsFood();
    if (meals) {
      this.setState({
        meals,
        isLoading: false,
      });
    }
  }

  renderIngredients() {
    const { meals } = this.state;
    const { dispatchIngredients } = this.props;
    const LENGTH = 12;
    const INITIAL_LENGTH = 0;
    const MAX_LENGTH = meals.length > LENGTH ? LENGTH : meals.length;
    return (
      <div>
        { meals.slice(INITIAL_LENGTH, MAX_LENGTH).map((meal, index) => (
          <CustomIngredientsFoods
            key={ meal.idIngredient }
            index={ index }
            meal={ meal }
            dispatch={ dispatchIngredients }
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

const mapDispatchToProps = (dispatch) => ({
  dispatchIngredients: (Ingredients) => dispatch(requestIngredientsFoods(Ingredients)),
});

FoodsIngredients.propTypes = {
  dispatchIngredients: PropTypes.func.isRequired,
  meals: PropTypes.shape({
    // length: PropTypes.number.isRequired,
    slice: PropTypes.func.isRequired,
  }).isRequired,
};
export default connect(null, mapDispatchToProps)(FoodsIngredients);
