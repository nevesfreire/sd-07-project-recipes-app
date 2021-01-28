import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCategories } from '../actions';
import '../css/food.css';

class DrinksCategoryFilter extends Component {
  componentDidMount() {
    const { requestCategories, endPoint } = this.props;
    requestCategories(endPoint);
  }

  render() {
    const { getCategories } = this.props;
    const DRINK_LENGTH = 5;

    if (getCategories.drinks) {
      const filterArray = getCategories.drinks
        .filter((_drink, index) => index < DRINK_LENGTH);
      return (
        <div>
          {filterArray.map((drink) => (
            <button
              type="button"
              key={ drink.strCategory }
              data-testid={ `${drink.strCategory}-category-filter` }
            >
              { drink.strCategory }
            </button>
          ))}
        </div>
      );
    }
    return (
      <div>
        Loading...
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestCategories: (endPoint) => dispatch(fetchCategories(endPoint)),
});

const mapStateToProps = ({ categories }) => ({
  getCategories: categories.categories,
});

export default connect(mapStateToProps, mapDispatchToProps)(DrinksCategoryFilter);

DrinksCategoryFilter.propTypes = {
  endPoint: PropTypes.string.isRequired,
  requestCategories: PropTypes.func.isRequired,
  getCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
};
