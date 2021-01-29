import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CustomFooter, CustomIngredientsDrinks } from '../components';
import CustomHeader from '../components/CustomHeader';
import { getIngredientsDrink } from '../services';
import { requestIngredientsDrinks } from '../redux/actions/drinkRecipesAction';

class DrinksIngredients extends Component {
  constructor() {
    super();
    this.renderIngredients = this.renderIngredients.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
    this.state = {
      drinks: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.handleIngredients();
  }

  async handleIngredients() {
    const { drinks } = await getIngredientsDrink();
    this.setState({
      drinks,
      isLoading: false,
    });
  }

  renderIngredients() {
    const { drinks } = this.state;
    const { dispatchIngredients } = this.props;
    const LENGTH = 12;
    const INITIAL_LENGTH = 0;
    const MAX_LENGTH = drinks.length > LENGTH ? LENGTH : drinks.length;
    return (
      <div>
        { drinks.slice(INITIAL_LENGTH, MAX_LENGTH).map((drink, index) => (
          <CustomIngredientsDrinks
            key={ drink.idIngredient }
            index={ index }
            drink={ drink }
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
  dispatchIngredients: (Ingredients) => dispatch(requestIngredientsDrinks(Ingredients)),
});

DrinksIngredients.propTypes = {
  dispatchIngredients: PropTypes.func.isRequired,
  meals: PropTypes.shape({
    length: PropTypes.number.isRequired,
    slice: PropTypes.func.isRequired,
  }).isRequired,
};
export default connect(null, mapDispatchToProps)(DrinksIngredients);
