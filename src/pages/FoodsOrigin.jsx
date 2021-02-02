import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { CustomFooter, CustomDropdown } from '../components';
import CustomHeader from '../components/CustomHeader';
import CustomDropCategory from '../components/CustomDropCategory';
import {
  requestArea,
  requestAreaFailed,
  allCategoriesFoodsAction,
  listFoodRecipes,
  updateFoodIsFetching,
} from '../redux/actions';
import { getAllFoodCategories, getFoodRecipes, getAllOrigin } from '../services';

class ExploreArea extends Component {
  constructor() {
    super();
    this.getOrigin = this.getOrigin.bind(this);
    this.renderCategories = this.renderCategories.bind(this);
    this.renderAlertError = this.renderAlertError.bind(this);
    this.state = {
      data: [],
      loading: true,
      mealsCategories: [],
    };
  }

  componentDidMount() {
    const { dispatchFoodRecipes, currentCategoryFood } = this.props;
    if (currentCategoryFood === 'all') {
      dispatchFoodRecipes({});
    } else {
      const ingredientsObj = {
        searchInput: currentCategoryFood,
        searchRadio: 'i',
      };
      dispatchFoodRecipes(ingredientsObj);
    }
    this.handleCategories();
    this.getOrigin();
  }

  async handleCategories() {
    const { meals } = await getAllFoodCategories();
    this.setState({
      mealsCategories: Object.values(meals),
    });
  }

  async getOrigin() {
    const { meals } = await getAllOrigin();
    this.setState({ data: meals,
      loading: false });
  }

  renderAlertError() {
    const { dispatchUpdateFoodIsFetching } = this.props;
    dispatchUpdateFoodIsFetching();
    return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  renderCategories() {
    const { mealsCategories } = this.state;
    if (mealsCategories !== undefined) {
      return (
        <CustomDropCategory mealsCategories={ mealsCategories } />
      );
    }
  }

  render() {
    const { data, loading } = this.state;
    return (
      <div>
        <CustomHeader title="Explorar Origem" />
        {loading ? <p>Loadinggg</p> : <CustomDropdown data={ data } /> }
        {loading ? <p>Loadinggg</p> : this.renderCategories() }
        <CustomFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.foodRecipesReducer.isFetching,
  meals: state.foodRecipesReducer.meals,
  categories: state.foodRecipesReducer.categories,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFoodRecipes: (searchHeader) => dispatch(getFoodRecipes(searchHeader)),
  dispatchAllCategories: (allCategories) => {
    dispatch(allCategoriesFoodsAction(allCategories));
  },
  dispatchInitialCards: (JSONRequestAllCAtegories) => {
    dispatch(listFoodRecipes(JSONRequestAllCAtegories));
  },
  dispatchUpdateFoodIsFetching: () => dispatch(updateFoodIsFetching()),
});

ExploreArea.propTypes = {
  currentCategoryFood: PropTypes.string.isRequired,
  dispatchUpdateFoodIsFetching: PropTypes.func.isRequired,
  dispatchFoodRecipes: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  meals: PropTypes.shape({
    length: PropTypes.number.isRequired,
    slice: PropTypes.func.isRequired,
  }).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ExploreArea);
