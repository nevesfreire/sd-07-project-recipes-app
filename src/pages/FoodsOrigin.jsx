import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { CustomFooter, CustomDropdown, CustomCardFood } from '../components';
import CustomHeader from '../components/CustomHeader';
import { requestRecipes } from '../redux/actions';
import { getFoodRecipes, getAllOrigin } from '../services';

class ExploreArea extends Component {
  constructor() {
    super();
    this.getOrigin = this.getOrigin.bind(this);
    this.renderAlertError = this.renderAlertError.bind(this);
    this.renderRecipes = this.renderRecipes.bind(this);
    this.allFoods = this.allFoods.bind(this);

    this.state = {
      data: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.getOrigin();
    this.allFoods();
  }

  handleRecipes() {
    const { meals, isFetching } = this.props;
    const numberToComper = 1;
    if (meals.length === numberToComper) {
      return <Redirect to={ `/comidas/${meals[0].idMeal}` } />;
    }
    if (!meals.length && !isFetching) return this.renderAlertError();
    if (meals.length === 1) return this.redirectToRecipeDetail();
    return this.renderRecipes();
  }

  async getOrigin() {
    const { meals } = await getAllOrigin();
    this.setState({ data: meals, loading: false });
  }

  allFoods() {
    const { dispatchFoodRecipes } = this.props;
    dispatchFoodRecipes({});
  }

  renderRecipes() {
    const { meals } = this.props;
    const LENGTH = 12;
    const INITIAL_LENGTH = 0;
    const MAX_LENGTH = meals.length > LENGTH ? LENGTH : meals.length;
    return (
      <div>
        {meals
          .slice(INITIAL_LENGTH, MAX_LENGTH)
          .map((meal, index) => (
            <CustomCardFood key={ meal.idMeal } index={ index } meal={ meal } />
          ))}
      </div>
    );
  }

  renderAlertError() {
    const { dispatchUpdateFoodIsFetching } = this.props;
    dispatchUpdateFoodIsFetching();
    return alert(
      'Sinto muito, não encontramos nenhuma receita para esses filtros.',
    );
  }

  render() {
    const { data, loading } = this.state;
    return (
      <div>
        <CustomHeader title="Explorar Origem" />
        {loading ? (
          <p>Loadinggg</p>
        ) : (
          <CustomDropdown
            data={ data }
            allFoods={ this.allFoods }
          />
        )}
        {this.handleRecipes()}

        <CustomFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.recipesReducer.isFetching,
  meals: state.recipesReducer.recipes,

});
const mapDispatchToProps = (dispatch) => ({
  dispatchFoodRecipes: (searchHeader) => dispatch(getFoodRecipes(searchHeader)),
  dispatchUpdateFoodIsFetching: () => dispatch(requestRecipes()),
});

ExploreArea.propTypes = {
  dispatchUpdateFoodIsFetching: PropTypes.func.isRequired,
  dispatchFoodRecipes: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  meals: PropTypes.shape({
    length: PropTypes.number.isRequired,
    slice: PropTypes.func.isRequired,
  }).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ExploreArea);
