import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { CustomSearchBar, CustomCardDrink } from '../components';
import getDrinkRecipes from '../services/drinkApi';
import { updateDrinkIsFetching } from '../redux/actions';

class Drinks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchHeader: {
        searchInput: '',
        searchRadio: '',
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleInputChange({ target: { name, value } }) {
    this.setState((prevState) => ({
      ...prevState,
      searchHeader: {
        ...prevState.searchHeader,
        [name]: value,
      },
    }));
  }

  async handleButtonClick() {
    const { dispatchDrinkRecipes } = this.props;
    const { searchHeader } = this.state;
    const { searchRadio, searchInput } = searchHeader;
    if (searchRadio === 'f' && searchInput.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    await dispatchDrinkRecipes(searchHeader);
  }

  handleRecipes() {
    const { drinks, isFetching } = this.props;
    if (!drinks.length && !isFetching) return this.renderAlertError();
    if (drinks.length === 1) return this.redirectToRecipeDetail();
    return this.renderRecipes();
  }

  redirectToRecipeDetail() {
    const { drinks } = this.props;
    return <Redirect to={ `/bebidas/${drinks[0].idDrink}` } />;
  }

  renderAlertError() {
    const { dispatchUpdateDrinkIsFetching } = this.props;
    dispatchUpdateDrinkIsFetching();
    return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  renderRecipes() {
    const { drinks } = this.props;
    const LENGTH = 12;
    const INITIAL_LENGTH = 0;
    const MAX_LENGTH = (drinks.length > LENGTH) ? LENGTH : drinks.length;
    return (
      <div>
        { drinks.slice(INITIAL_LENGTH, MAX_LENGTH)
          .map((drink, index) => (
            <CustomCardDrink key={ drink.idDrink } index={ index } drink={ drink } />)) }
      </div>
    );
  }

  render() {
    return (
      <div>
        <button type="button" data-testid="search-top-btn">SearchBar</button>
        <CustomSearchBar
          inputChange={ this.handleInputChange }
          buttonClick={ this.handleButtonClick }
        />
        { this.handleRecipes() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.drinkRecipesReducer.isFetching,
  drinks: state.drinkRecipesReducer.drinks,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchDrinkRecipes: (searchHeader) => dispatch(getDrinkRecipes(searchHeader)),
  dispatchUpdateDrinkIsFetching: () => dispatch(updateDrinkIsFetching()),
});

Drinks.propTypes = {
  dispatchDrinkRecipes: PropTypes.func.isRequired,
  dispatchUpdateDrinkIsFetching: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  drinks: PropTypes.shape({
    length: PropTypes.number.isRequired,
    slice: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);
